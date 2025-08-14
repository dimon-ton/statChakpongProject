// ทำหน้าที่เพื่อส่งข้อมูลสรุปสถิติประจำวัน


  var wsheet = SpreadsheetApp.openById('1KDL3PAkKwC-w1UDB5cz8SnX2sA6_uopm2Slgj_iEifw')
  var sheet = wsheet.getSheetByName('Form Responses 1')
  var lastRow = sheet.getLastRow()
  var arrClass = ['อ.1','อ.2','อ.3','ป.1','ป.2','ป.3','ป.4','ป.5','ป.6']
  var lastDate
  var today

// ส่งข้อมูลสรุปสถิติประจำวัน
function summation() {

      today = Utilities.formatDate(new Date(),"GMT+7","dd/MM/yyyy")
      
      var message = '📝✏️สรุปสถิตินักเรียนประจำวันที่: ' + today + "\n\n"
      var messageTotal = 0
      var messageMissing = 0
      var messageTotalExist = 0
      

 lastDate = Utilities.formatDate(sheet.getRange(lastRow,2).getValue(),'GMT+7','dd/MM/yyyy')

if (lastDate == today) {
    for (let j=0; j < arrClass.length; j++) {
        var blnCheck = false
        if (lastRow < 15) {
          for (let i=2; i<=lastRow; i++) {
      
            var dateItem = Utilities.formatDate(sheet.getRange(i,2).getValue(),"GMT+7", "dd/MM/yyyy")
          
            if (arrClass[j] == sheet.getRange(i,3).getValue() && dateItem == today) {
            
            let totalNum = sheet.getRange(i,4).getValue() + sheet.getRange(i,5).getValue()
            let missingNum = sheet.getRange(i,6).getValue() + sheet.getRange(i,7).getValue()
            let totalExist = totalNum - missingNum

            blnCheck = true
            messageTotal += totalNum
            messageMissing += missingNum
            messageTotalExist += totalExist

            message += "\t" + arrClass[j] + " 👇👇" + " \n\tจำนวนนักเรียนทั้งหมด: " + totalNum + " \n\tจำนวนนักเรียนที่มา: " + totalExist  + " \n\tจำนวนนักเรียนที่ขาด: " + missingNum + "\n\n"
            break 
        }    
        
      } 

    } else {
          for (let i=lastRow-15; i<=lastRow; i++) {
      
          var dateItem = Utilities.formatDate(sheet.getRange(i,2).getValue(),"GMT+7", "dd/MM/yyyy")
          
            if (arrClass[j] == sheet.getRange(i,3).getValue() && dateItem == today) {
            
              let totalNum = sheet.getRange(i,4).getValue() + sheet.getRange(i,5).getValue()
              let missingNum = sheet.getRange(i,6).getValue() + sheet.getRange(i,7).getValue()
              let totalExist = totalNum - missingNum

              blnCheck = true
              messageTotal += totalNum
              messageMissing += missingNum
              messageTotalExist += totalExist

              message += "\t" + arrClass[j] + " 👇👇" + " \n\tจำนวนนักเรียนทั้งหมด: " + totalNum + " \n\tจำนวนนักเรียนที่มา: " + totalExist  + " \n\tจำนวนนักเรียนที่ขาด: " + missingNum + "\n\n"
              
              break
            }    
        
          } 

        }
              if (blnCheck == false) {
                  message += "\t❗" + arrClass[j] + " 👇👇" + " \n\tไม่พบข้อมูล" + "\n\n"
              }
    }

        message += '📕จำนวนนักเรียนทั้งหมด: ' + messageTotal + '\n🖊️จำนวนนักเรียนที่มาเรียนทั้งหมด: ' + messageTotalExist + '\n🖊️จำนวนนักเรียนที่ขาดเรียนทั้งหมด: ' + messageMissing 
        // Logger.log(message)


        sendLineNotify(message)
        Utilities.sleep(10*1000)
        if (MissingCheck() == undefined) {
          //pass
        } else {
          sendLineNotify(MissingCheck())
        }

  }

    

}
    


/*
function sendLineNotify(message, token) {
  var options = {
    "method": "post",
    "payload": {
      "message": message,
    },
    "headers": { "Authorization": "Bearer " + token }
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

*/


// ตรวจสอบว่าใครยังไม่ส่งข้อมูลเข้าวันไหนบ้าง
function MissingCheck() {
  var date_data = sheet.getRange(2, 2,lastRow-1, 1).getValues()
  var class_data = sheet.getRange(2, 3,lastRow-1, 1).getValues()
  var date_check = []
  try {
     for (i=0; i<lastRow-1; i++) {
     date_check[i] = Utilities.formatDate(date_data[i][0],'GMT+7','dd/MM/yyyy')
      }
  } catch(err) {
      Logger.log(`ลำดับที่ ${i} Error: ${err}`)
  }
    //ทำให้เป็น Unique
    date_check = [...new Set(date_check)]

  var msg = '❗❗วันที่ยังไม่มีข้อมูลส่งเข้ามาแยกตามระดับชั้น❗❗\n\n'
  msg += `ข้อมูล ณ วันที่: ${Utilities.formatDate(new Date(),'GMT+7','dd/MM/yyyy')} เวลา: ${Utilities.formatDate(new Date(),'GMT+7','HH:mm:ss')}` + '\n\n'

  var checked = 0

  for (let C of arrClass) {
    let int = 0
    let K1 = new Array

    for (i=0; i<lastRow-1; i++) {
          if (class_data[i][0] == C) {
            
              K1[int++] = Utilities.formatDate(date_data[i][0],'GMT+7','dd/MM/yyyy')
          } 
    }
    K1 = [...new Set(K1)]

    if (date_check.length - K1.length != 0) {
      msg += '❗' + C + '👇' + '\n'
    } else {
      msg += '👏' + C + '👇' + '\n'
    }
    if (K1.length == date_check.length) {
        msg += 'ข้อมูลครบแล้ว'
        checked += 1
    } else {
        let last_check = 0
        for (j=0; j<date_check.length; j++) {
          if (K1.includes(date_check[j]) == false) {
              last_check += 1
              if (last_check == date_check.length - K1.length) {
                  msg += date_check[j]
              } else {
                  msg += date_check[j] + ', '
              }
          }
        }
    }
    msg += '\n\n'
  }

  // Logger.log(msg)

    if (checked != 9) {
        return msg
    }
      
      // Logger.log(date_check.length)
}


// ส่งแจ้งเตือน คนที่ยังไม่ส่งข้อมูลเข้ามาอีกครั้ง
function sendCheck() {
  var lastRow = sheet.getLastRow()
  lastDate = Utilities.formatDate(sheet.getRange(lastRow,2).getValue(),'GMT+7','dd/MM/yyyy')
  today = Utilities.formatDate(new Date(),"GMT+7","dd/MM/yyyy")

  if (lastDate == today) {
      if (MissingCheck() == undefined) {
        //pass
      } else {
        sendLineNotify(MissingCheck())
      }
  }
  removeBlank()
}

function removeBlank() {
  for (let i = lastRow - 20; i<=lastRow; i++) {
        let data1 = sheet.getRange(i,8)
        let data2 = sheet.getRange(i,9)
        data1.trimWhitespace()
        data2.trimWhitespace()
  }
}
