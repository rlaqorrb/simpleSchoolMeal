function Meal() {
  function Time() {
    let currentTime = new Date();
    let currentYear = String(currentTime.getFullYear());
    let currentMonth = String(currentTime.getMonth() + 1);
    if (currentMonth.length < 2) currentMonth = '0' + currentMonth;
    let currentDate = String(currentTime.getDate());
    if (currentDate.length < 2) currentDate = '0' + currentDate;
    let currentDateCopy = `${currentYear}-${currentMonth}-${currentDate}`;
    return currentDateCopy;
  }

  function mealDay() {
    let arr = Time();
    arr = arr.split('-');
    return arr[0] + arr[1] + arr[2];
  }
  // console.log(mealDay());
  $('.mealTimeInput').val(Time());
  ajax(mealDay());
}

Meal();

$('.mealTimeInput').on('change', () => {
  function mealDay() {
    let currentDate = $('.mealTimeInput').val();
    currentDate = currentDate.split('-');
    return currentDate[0] + currentDate[1] + currentDate[2];
  }
  // console.log(mealDay())
  ajax(mealDay());
})

function ajax(mealDay) {
  $.ajax({
    url: 'https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=S10&SD_SCHUL_CODE=9010333&MLSV_YMD=' + mealDay,
    dataType: 'json',
    type: 'GET',
    success: function (resp) {
      // console.log(resp);
      let lunch = resp?.mealServiceDietInfo?.[1]?.row[0];
      let dinner = resp?.mealServiceDietInfo?.[1]?.row[1];
      // console.log(lunch);
      // console.log(dinner);
      $('.schNm').html(lunch?.SCHUL_NM ?? '물금고등학교');
      $('.L-disNm').html(lunch?.DDISH_NM ?? '정보없음');
      $('.L-disCal').html(lunch?.CAL_INFO ?? '정보없음');
      $('.L-disNTR').html(lunch?.NTR_INFO ?? '정보없음');
      $('.D-disNm').html(dinner?.DDISH_NM ?? '정보없음');
      $('.D-disCal').html(dinner?.CAL_INFO ?? '정보없음');
      $('.D-disNTR').html(dinner?.NTR_INFO ?? '정보없음');
    }
  })
}