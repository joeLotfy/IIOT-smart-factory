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