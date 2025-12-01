async function updateData() {
  const res = await fetch("/api/latest");
  const data = await res.json();

  document.getElementById("temp").innerText = data.temperature;
  document.getElementById("hum").innerText = data.humidity;
}

setInterval(updateData, 1000);  // update every 1s


const sampleData = [
    { sensor: 'DHT11', value: '25°C', time: '2023-10-01 10:00', status: 'normal' },
    { sensor: 'LDR', value: '500 lux', time: '2023-10-01 10:05', status: 'alert' },
    { sensor: 'PIR SR501', value: 'حركة مكتشفة', time: '2023-10-01 10:10', status: 'alert' },
    { sensor: 'RFID', value: 'ID: 12345', time: '2023-10-01 10:15', status: 'normal' },
 { sensor: 'MQ-2' , value: 'ID: 12345', time: '2023-10-01 10:15', status: 'normal' }  ,  
    
];
function loadData() {
    const tbody = document.querySelector('#sensorTable tbody');
    tbody.innerHTML = '';
    sampleData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sensor}</td>
            <td>${item.value}</td>
            <td>${item.time}</td>
            <td class="${item.status}">${item.status === 'alert' ? 'تنبيه' : 'طبيعي'}</td>
            
        `;
        tbody.appendChild(row);
    });
    checkAlerts();
}
function checkAlerts() {
    const hasAlert = sampleData.some(item => item.status === 'alert');
    const alertsDiv = document.getElementById('alerts');
    if (hasAlert) {
        alertsDiv.classList.remove('hidden');
    } else {
        alertsDiv.classList.add('hidden');
    }
}
document.getElementById('refreshBtn').addEventListener('click', loadData);
window.onload = loadData;
setInterval(loadData, 30000);

const translations = {
    ar: {
        dashboardTitle: 'لوحة تحكم المصنع الذكي',
        logoutLink: 'تسجيل الخروج',
        sensorDataTitle: 'بيانات المستشعرات الأخيرة',
        sensorType: 'نوع المستشعر',
        value: 'القيمة',
        time: 'الوقت',
        status: 'الحالة',
        refreshBtn: 'تحديث البيانات',
        alertExample: 'تنبيه: درجة الحرارة عالية! (مثال)',
        langToggle: 'EN / عربي',
        statusAlert: 'تنبيه', 
        statusNormal: 'طبيعي' ,
        value500lux:'500 lux',
       
    },
    en: {
        dashboardTitle: 'Smart Factory Dashboard',
        logoutLink: 'Logout',
        sensorDataTitle: 'Recent Sensor Data',
        sensorType: 'Sensor Type',
        value: 'Value',
        time: 'Time',
        status: 'Status',
        refreshBtn: 'Refresh Data',
        alertExample: 'Alert: High Temperature! (Example)',
        langToggle: 'عربي / AR',
        statusAlert: 'Alert',
        statusNormal: 'Normal',
          value500lux:'مممممم',
       
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langButton = document.getElementById('lang-toggle');
    const htmlElement = document.querySelector('html'); 
    
    let currentLang = htmlElement.getAttribute('lang') || 'ar'; 

    function translateTableStatus(lang) {
        const t = translations[lang];
        
      
        document.querySelectorAll('.alert, .normal').forEach(cell => {
          
            if (cell.classList.contains('alert')) {
                cell.textContent = t.statusAlert;
            } else if (cell.classList.contains('normal')) {
                cell.textContent = t.statusNormal;
            }
        });
    }

    function updateContent(lang) {
        const translation = translations[lang];
        
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        htmlElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translation[key]) {
                element.textContent = translation[key];
            }
        });
        langButton.textContent = translation.langToggle;
        translateTableStatus(lang);
    }
    updateContent(currentLang);
    langButton.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        updateContent(currentLang);
    });
    
   
});