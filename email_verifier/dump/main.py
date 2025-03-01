import re
import smtplib
import dns.resolver

def is_valid_email_format(email):
    """
    Check if the email has a valid format using regex.
    """
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

def get_mx_record(domain):
    """
    Retrieve the MX record for a domain.
    """
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        return str(mx_records[0].exchange)
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.exception.Timeout):
        return None

def verify_email_exists(email):
    """
    Verify if the email exists by checking the domain's MX record
    and optionally performing an SMTP handshake.
    """
    if not is_valid_email_format(email):
        return False, "Invalid email format"

    domain = email.split('@')[-1]
    mx_record = get_mx_record(domain)
    if not mx_record:
        return False, "Domain has no MX record"

    # SMTP verification (Optional)
    try:
        smtp = smtplib.SMTP(mx_record)
        smtp.set_debuglevel(0)  # Set to 1 for debugging output
        smtp.helo()
        smtp.mail('test@example.com')
        code, message = smtp.rcpt(email)
        smtp.quit()
        if code == 250:
            return True, "Email exists"
        else:
            return False, f"SMTP verification failed with code {code}"
    except Exception as e:
        return False, f"SMTP error: {str(e)}"

# Example usage
if __name__ == "__main__":
    # email_to_test = "ryixbaycbyzxtqalpm@nbmbb.com"
    # result, message = verify_email_exists(email_to_test)
    # print(f"Result: {result}, Message: {message}")

    # email_to_test = "kishan@switchon.io"
    # result, message = verify_email_exists(email_to_test)
    # print(f"Result: {result}, Message: {message}")
    from prettytable import PrettyTable
    t = PrettyTable(['Email', 'Result', "Message"])
    # t.add_row(['Alice', 24])
    # t.add_row(['Bob', 19])
    

    a=['rsivaku8@ford.com', 'prakash.kalel@gm.com', 'ananda.raja@gknautomotive.com', 'velu_pl@bradycorp.com', 'siva.songappan@visteon.com', 'shivram.saran@jcb.com', 'GurupadaBalad@omnimatrixin.com', 'devarajanaik@varroc.in', 'sagarn@varroc.in', 'vijayanandsangnalkar@varroc.in', 'karthick.a@ashokleyland.com', 'nandini.hiremath@autoliv.com', 'darshan.bhat@continental-corporation.com', 'aman.gurung@cooperstandard.com', 'sudarshan.p@bosch.in', 'jk.kandasamy@caterpillar.com', 'harish.rao@cumminsindia.com', 'surendar.mani@global.honda', 'aravindha-r@musashi.co.in', 'yoganand.r@ashokleyland.com', 'yoga@toyota-kirloskar.co.in', 'ykumar@humaneticsgroup.com', 'yeshwant.pai@continental.com', 'yedhu.krishna.prasanna@continental-corporation.com', 'yeshwanth.c@atherenergy.com', 'yelguresh.kulkarni@nexteer.com', 'yayathi.cj@anandgroupindia.com', 'ravi.janardanan@leggett.com', 'sathishkumar.muthusamy@leggett.com', 'deva.prince@leggett.com']
    for email_to_test in a:
        result, message = verify_email_exists(email_to_test)
        t.add_row([email_to_test,result, message[:100]])
    
    print(t)