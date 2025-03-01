import pandas as pd


l = [
    "prakash.kalel@gm.com",
    "ananda.raja@gknautomotive.com",
    "velu_pl@bradycorp.com",
    "siva.songappan@visteon.com",
    "shivram.saran@jcb.com",
    "GurupadaBalad@omnimatrixin.com",
    "devarajanaik@varroc.in",
    "sagarn@varroc.in",
    "vijayanandsangnalkar@varroc.in",
    "karthick.a@ashokleyland.com",
    "nandini.hiremath@autoliv.com",
    "darshan.bhat@continental-corporation.com",
    "aman.gurung@cooperstandard.com",
    "sudarshan.p@bosch.in",
    "jk.kandasamy@caterpillar.com",
    "harish.rao@cumminsindia.com",
    "surendar.mani@global.honda",
    "aravindha-r@musashi.co.in",
    "yoganand.r@ashokleyland.com",
    "yoga@toyota-kirloskar.co.in",
    "ykumar@humaneticsgroup.com",
    "yeshwant.pai@continental.com",
    "yedhu.krishna.prasanna@continental-corporation.com",
    "yeshwanth.c@atherenergy.com",
    "yelguresh.kulkarni@nexteer.com",
    "yayathi.cj@anandgroupindia.com",
    "ravi.janardanan@leggett.com",
    "sathishkumar.muthusamy@leggett.com",
    "deva.prince@leggett.com",
]

df = pd.DataFrame(l, columns=["email"])
df.to_excel("processed/a.xlsx")
