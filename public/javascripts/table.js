
  var colors = ['#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000', "black",
  '#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000',
   "black",'#30e708','black', "#c10000",'black', "#c10000",'black', "#c10000",'black', "#c10000",
   'black', "#c10000",'black', "#c10000",'black', "#c10000",'black', "#c10000",'black','#c10000', "#30e708"];
  var numbers = ['27','10','25','29','12','8','19','31','18','6','21',
                      '33','16','4','23','35','14','2','0','28','9','26','30',
                      '11','7','20','32','17','5','22','34','15','3','24','36',
                      '13','1','00'];

  var startAngle = 0;
  var arc = Math.PI / 19;
  var spinTimeout = null;

  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  var ctx;






  function draw() {
    drawRouletteWheel();
  }

  function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      var outsideRadius = 240;
      var textRadius = 175;
      var insideRadius = 125;
      var middleRadius = 145;
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,400,400);


      ctx.strokeStyle = "black";
      ctx.lineWidth = 10;

      ctx.font = '14px sans-serif';

      for(var i = 0; i < 38; i++) {
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.arc(250, 250, middleRadius, angle + arc, angle, true);

        ctx.stroke();
        ctx.fill();

        ctx.save();
        // ctx.shadowOffsetX = -1;
        // ctx.shadowOffsetY = -1;
        // ctx.shadowBlur    = 0;
        ctx.shadowColor   = "rgb(220,220,220)";
        ctx.fillStyle = "white";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = numbers[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }

  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);

    var answer = document.getElementById('answer');
    answer.innerHTML = '';


  }



var selection = '';
var tableOut = document.getElementById('board');
var winnings = '';
var balance = document.getElementById('balance');
var account = balance.value || 1000
var row1Array = ['3','6','9','12','15','18','21','24','27','30','33','36']
var select = document.getElementById('selected')
tableOut.addEventListener('click', function (e) {
  var y = e.target.id;
  selection = y;
  select.innerHTML = selection;
})



  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    var text = numbers[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);

    var firstBlock = ''
    var color='';
    var pickNum='';
      switch(text){
        case '3':
        case '9':
        case '12':
        case '18':
        case '21':
        case '27':
        case '30':
        case '36':
        case '5':
        case '14':
        case '23':
        case '29':
        case '32':
        case '1':
        case '7':
        case '16':
        case '19':
        case '25':
        case '34':
          var color = 'red';
          var pickNum = text;
          break;
        case '6':
        case '15':
        case '24':
        case '33':
        case '2':
        case '8':
        case '11':
        case '17':
        case '20':
        case '26':
        case '29':
        case '35':
        case '4':
        case '10':
        case '13':
        case '22':
        case '28':
        case '31':
          var color = 'black';
          var pickNum = text;
          break
        case '0':
        case '00':
          var color = 'green';
          break;
    }

    if(color === 'red' && selection==='red'){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      account += parseInt(bet);
      balance.innerHTML= '$' + account
    }
    if(color === 'black' && selection==='red'){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost'
      account-=bet;
      balance.innerHTML= '$' + account
    }

    if(color == 'black' && selection=='black'){
    var bet = document.getElementById('bet').value;
      answer.innerHTML='You Won!'
      account += parseInt(bet);
      balance.innerHTML= '$' + account
    }
    if(color == 'red' && selection=='black'){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost'
      account-=bet;
      balance.innerHTML= '$' + account
    }


    if(color =='green' && (selection== 'red' || selection== 'black')){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'Green: You Lost'
      account-=bet;
      balance.innerHTML= '$' + account
    }


    if(selection == 'block1' && (parseInt(text)<13 && parseInt(text)>0)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      var win = bet*2;
      account+=win;
      balance.innerHTML= '$' + account
    }


    if(selection == 'block1' && (parseInt(text)>=13 || color=='green')){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost'
      account-=bet;
      balance.innerHTML= '$' + account
    }


    if(selection == 'block2' && (parseInt(text)>=13 && parseInt(text)<25)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      var win = bet*2;
      account+=win;
      balance.innerHTML= '$' + account
    }

    if(selection == 'block2' && (parseInt(text)<13 || parseInt(text)>24 || color=='green')){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost'
      account-=bet;
      balance.innerHTML= '$' + account
    }

    if(selection == 'block3' && (parseInt(text)>=26 && parseInt(text)<37)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      var win = bet*2;
      account+=win;
      balance.innerHTML= '$' + account
    }

    if(selection == 'block3' && (parseInt(text)<25 || color=='green')){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost';
      account-=bet;
      balance.innerHTML= '$' + account
    }

    if(selection == 'even' && (parseInt(text)%2==0 && (text!= ('0' || '00')))){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      account+=parseInt(bet);
      balance.innerHTML= '$' + account
    }


    if(selection == 'even' && (parseInt(text)%2 != 0)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost';
      account-=bet;
      balance.innerHTML= '$' + account;
    }

    if(selection == 'odd' && (parseInt(text)%2 != 0)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won!';
      account+=parseInt(bet);
      balance.innerHTML= '$' + account
    }

    if(selection == 'odd' && (parseInt(text)%2==0 && (text!= ('0' || '00')))){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost';
      account-=bet;
      balance.innerHTML= '$' + account;
    }


    if(selection == 'firstHalf' && (parseInt(text)<19)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won 1st!';
      account+=parseInt(bet);
      balance.innerHTML= '$' + account
    }

    if(selection == 'firstHalf' && (parseInt(text)>=19)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost';
      account-=bet;
      balance.innerHTML= '$' + account;
    }

    if(selection == 'secondHalf' && (parseInt(text)>18)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Won! 2nd';
      account+=parseInt(bet);
      balance.innerHTML= '$' + account
    }

    if(selection == 'secondHalf' && (parseInt(text)<=18)){
      var bet = document.getElementById('bet').value;
      answer.innerHTML= 'You Lost';
      account-=bet;
      balance.innerHTML= '$' + account;
    }

    if(selection == text){
      var bet = document.getElementById('bet').value;
      answer.innerHTML='Big win!'
      var winnings = bet*35;
      account+=winnings;
      balance.innerHTML= '$' + account
    }

    // for(i=0;i<row1Array.length;i++){
    //   if(selection == 'row1' && row1Array[i] == text){
    //     var bet = document.getElementById('bet').value;
    //     answer.innerHTML= 'You Won!';
    //     var win = bet*2;
    //     account+=win;
    //     balance.innerHTML= '$' + account
    //   }
    // }
    //
    // for(i=0;i<row1Array.length;i++){
    //   if(selection == 'row1' && row1Array[i] != text){
    //     var bet = document.getElementById('bet').value;
    //     answer.innerHTML= 'You Lost';
    //     account-=bet;
    //     balance.innerHTML= '$' + account;
    //   }
    // }

    if(selection == 'row1'){
      switch(text) {
        case '3':
        case '6':
        case '9':
        case '12':
        case '15':
        case "18":
        case '21':
        case '24':
        case '27':
        case '30':
        case '33':
        case '36':
          var row = 'row1'
          if(row == 'row1'){
            var bet = document.getElementById('bet').value;
            answer.innerHTML= 'You Won!';
            var win = bet*2;
            account+=win;
            balance.innerHTML= '$' + account
          }
          else
          {
            var bet = document.getElementById('bet').value;
            answer.innerHTML= 'You Lost';
            account-=bet;
            balance.innerHTML= '$' + account;
            }
        break
      }
    }

    if(selection == 'row2'){
      switch(text) {
        case '2':
        case '5':
        case '8':
        case '11':
        case '14':
        case "17":
        case '20':
        case '23':
        case '26':
        case '29':
        case '32':
        case '35':
          var row = 'row2'
          if(row == 'row2'){
            var bet = document.getElementById('bet').value;
            answer.innerHTML= 'You Won!';
            var win = bet*2;
            account+=win;
            balance.innerHTML= '$' + account
          }
          else
          {
            var bet = document.getElementById('bet').value;
            answer.innerHTML= 'You Lost';
            account-=bet;
            balance.innerHTML= '$' + account;
            }
        break
      }
    }

    if(selection == 'row3'){
      switch(text) {
        case '1':
        case '4':
        case '7':
        case '10':
        case '13':
        case "16":
        case '19':
        case '22':
        case '25':
        case '28':
        case '31':
        case '34':
          var row = 'row3';
        if(row == 'row3'){
          var bet = document.getElementById('bet').value;
          answer.innerHTML= 'You Won!';
          var win = bet*2;
          account+=win;
          balance.innerHTML= '$' + account
        } else {
            var bet = document.getElementById('bet').value;
            answer.innerHTML= 'You Lost';
            account-=bet;
            balance.innerHTML= '$' + account;
          }
        break
      }
    }










    var bankAccount = new XMLHttpRequest();
    bankAccount.open('post', '/casino/players', true);
    bankAccount.setRequestHeader("Content-type", 'application/json;charset=UTF-8')
    var bank = document.getElementById('balance');
    var banks= {'money': bank.innerHTML};
    bankAccount.send(JSON.stringify(banks));



    ctx.restore();
  }



  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  draw();
