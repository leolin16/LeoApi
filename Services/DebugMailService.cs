// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;
// using MailKit.Net.Smtp;
// using MimeKit;
// using MailKit.Security;

namespace LeoPortal2.Services
{
    public class DebugMailService : IMailService
    {
        private CommonServiceResult result;

        public async Task<CommonServiceResult> SendMail(string smtpMailAccount, string smtpMailPW, string to, string from, string subject, string body)
        {
            result = new CommonServiceResult()
            {
                Success = false,
                Message = "Undetermined failure while sending mails"
            };

            Debug.WriteLine($"Sending mail: To: {to}, From: {from}, Subject: {subject}");
            // var emailMessage = new MimeMessage();

            // emailMessage.From.Add(new MailboxAddress("", from));
            // emailMessage.To.Add(new MailboxAddress("", to));
            // emailMessage.Subject = subject;
            // emailMessage.Body = new TextPart("plain") { Text = body };

            // using (var client = new SmtpClient())
            // {
            //     //client.LocalDomain = "mail.muses.live";
            //     await client.ConnectAsync("smtp.muses.live", 465, SecureSocketOptions.SslOnConnect).ConfigureAwait(false);
            //     await client.AuthenticateAsync(smtpMailAccount, smtpMailPW);
            //     await client.SendAsync(emailMessage).ConfigureAwait(false);
            //     await client.DisconnectAsync(true).ConfigureAwait(false);
            // }

            return result;
        }
    }
}
