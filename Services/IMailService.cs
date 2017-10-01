using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeoPortal2.Services
{
    public interface IMailService
    {
        Task<CommonServiceResult> SendMail(string smtpMailAccount, string smtpMailPW, string to, string from, string subject, string body);

    }
}
