const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const Appointment = require('./models/Appointment');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thuleetha@gmail.com', //  Gmail address
        pass: 'qardlubrubbhyels'             //  App Password 
    }
});

const initReminderScheduler = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('🔄 Cron Job: Checking for eye checkup SMS reminders...');
        
        try {
            // calculate the date 6 months ago
            const targetDate = new Date();
            targetDate.setMonth(targetDate.getMonth() - 6);
            
            const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

            // 'is_reminder_sent: 0' filter
            const appointments = await Appointment.findAll({
                where: {
                    appointment_date: {
                        [Op.between]: [startOfDay, endOfDay]
                    },
                    is_reminder_sent: 0 
                }
            });

            if (appointments.length === 0) {
                console.log('✅ Cron Job: No pending reminders for today.');
                return;
            }

            for (let appt of appointments) {
                let phone = appt.patient_phone; 
                let patientName = appt.patient_name;

                if (phone) {
                    phone = phone.trim().replace(/\s+/g, '');
                    let smsGatewayEmail = '';
                    
                    // Dialog, Mobitel, Hutch, Airtel identity
                    if (phone.startsWith('077') || phone.startsWith('076') || phone.startsWith('+9477') || phone.startsWith('+9476')) {
                        let cleanNumber = phone.startsWith('0') ? '94' + phone.substring(1) : phone.replace('+', '');
                        smsGatewayEmail = `${cleanNumber}@sms.dialog.lk`;
                    } 
                    else if (phone.startsWith('071') || phone.startsWith('070') || phone.startsWith('+9471') || phone.startsWith('+9470')) {
                        let cleanNumber = phone.startsWith('0') ? '94' + phone.substring(1) : phone.replace('+', '');
                        smsGatewayEmail = `${cleanNumber}@sms.mobitel.lk`;
                    }
                    else if (phone.startsWith('074') || phone.startsWith('075') || phone.startsWith('+9474') || phone.startsWith('+9475')) {
                        let cleanNumber = phone.startsWith('0') ? '94' + phone.substring(1) : phone.replace('+', '');
                        smsGatewayEmail = `${cleanNumber}@sms.hutch.lk`;
                    }

                    if (smsGatewayEmail !== '') {
                        const smsBody = `Hello ${patientName}, It has been 6 months since your last eye checkup at OPTICAL Eyecare. Please book your next routine appointment today!`;

                        // send SMS
                        await transporter.sendMail({
                            from: '"OPTICAL Eyecare" <your-optical-email@gmail.com>',
                            to: smsGatewayEmail,
                            subject: '',
                            text: smsBody
                        });

                        console.log(`📱 SMS Reminder successfully routed to: ${phone}`);

                        // Database update: is_reminder_sent =1
                        appt.is_reminder_sent = 1;
                        await appt.save(); 
                        console.log(`💾 Database Updated: is_reminder_sent marked as 1 for ${patientName}`);

                    } else {
                        console.log(`⚠️ Could not determine network for phone number: ${phone}`);
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error running SMS reminder scheduler:', error);
        }
    });
};

module.exports = initReminderScheduler;