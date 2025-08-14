// ฟังชันก์เพื่อส่งรายงานสถิตินักเรียน เมื่อมีการกดปุ่ม submit
function onFormSubmit() {

var form = FormApp.getActiveForm()
var fRes = form.getResponses();
var formResponse = fRes[fRes.length - 1];
var itemResponses = formResponse.getItemResponses();

var msg = 'แจ้งเตือนสถิตินักเรียน' +
    ' \n' + 'วันที่' + ': ' + itemResponses[0].getResponse() +
    ' \n' + 'ระดับชั้น' + ': ' + itemResponses[1].getResponse() +
    ' \n' + 'จำนวนนักเรียนชายทั้งหมด' + ': ' + itemResponses[2].getResponse() +
    ' \n' + 'จำนวนนักเรียนหญิงทั้งหมด' + ': ' + itemResponses[3].getResponse() +
    ' \n' + 'จำนวนนักเรียนชายที่ขาด' + ': ' + itemResponses[4].getResponse() +
    ' \n' + 'จำนวนนักเรียนหญิงที่ขาด' + ': ' + itemResponses[5].getResponse() +
    ' \n' + 'รายชื่อนักเรียนชายที่ขาด' + ': ' + itemResponses[6].getResponse() +
    ' \n' + 'รายชื่อนักเรียนหญิงที่ขาด' + ': ' + itemResponses[7].getResponse() +
    ' \n\n\n' + 'คลิกลิงค์ด้านล้างเพื่อกรอกข้อมูล👇👇' +
    ' \n' + 'https://docs.google.com/forms/d/e/1FAIpQLSf8WGtzoag2Axd0G4FRvQuKf4l1RB1Qh5Yfc27VjAI4Sbybag/viewform?usp=sf_link'

sendLineNotify(msg);
  
}

// ฟังก์ชันทำหน้าที่ส่งข้อความไปยังไลน์
function sendLineNotify(message) {
var token = "inofipqBy6v77YGiERJnUTzB7bXWCK3remfyUg7RX94"; // ***ใส่ token ของกลุ่ม Line ที่ใช้งาน***
var options = {
  "method": "post",
  "payload": "message=" + message,
  "headers": {
  "Authorization": "Bearer " + token
  }
  };

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

