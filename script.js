// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorSections = document.querySelectorAll('.calculator-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            calculatorSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Initialize body fat input visibility
    toggleBodyFatInputs();

    // Initialize questionnaire tab switching
    const questionnaireTabButtons = document.querySelectorAll('.questionnaire-tab-btn');
    const questionnaireForms = document.querySelectorAll('.questionnaire-form');

    questionnaireTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionnaireId = this.getAttribute('data-questionnaire');
            
            // Remove active class from all questionnaire buttons and forms
            questionnaireTabButtons.forEach(btn => btn.classList.remove('active'));
            questionnaireForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            document.getElementById(questionnaireId + '-form').classList.add('active');
        });
    });
});

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height-bmi').value);
    const weight = parseFloat(document.getElementById('weight-bmi').value);
    const standard = document.getElementById('standard').value;

    if (!height || !weight || height <= 0 || weight <= 0) {
        document.getElementById('bmi-result').innerHTML = '<p class="warning">請輸入有效的身高和體重數值</p>';
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category, categoryClass, advice;
    
    if (standard === 'who') {
        if (bmi < 18.5) {
            category = '體重過輕';
            categoryClass = 'bmi-underweight';
            advice = '建議增加營養攝取，適度運動增加肌肉量';
        } else if (bmi < 25) {
            category = '正常範圍';
            categoryClass = 'bmi-normal';
            advice = '維持現有的健康生活方式';
        } else if (bmi < 30) {
            category = '體重過重';
            categoryClass = 'bmi-overweight';
            advice = '建議控制飲食，增加有氧運動';
        } else {
            category = '肥胖';
            categoryClass = 'bmi-obese';
            advice = '建議諮詢營養師或醫師，制定減重計畫';
        }
    } else { // Taiwan standard
        if (bmi < 18.5) {
            category = '體重過輕';
            categoryClass = 'bmi-underweight';
            advice = '建議增加營養攝取，適度運動增加肌肉量';
        } else if (bmi < 24) {
            category = '健康體重';
            categoryClass = 'bmi-normal';
            advice = '維持現有的健康生活方式';
        } else if (bmi < 27) {
            category = '體重過重';
            categoryClass = 'bmi-overweight';
            advice = '建議控制飲食，增加有氧運動';
        } else {
            category = '肥胖';
            categoryClass = 'bmi-obese';
            advice = '建議諮詢營養師或醫師，制定減重計畫';
        }
    }

    document.getElementById('bmi-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">您的 BMI 值</div>
            <div class="metric-value">${bmi.toFixed(1)}</div>
            <p class="${categoryClass}">分類：${category}</p>
            <div class="health-tip">
                <h4>健康建議</h4>
                <p>${advice}</p>
            </div>
        </div>
    `;
}

// BMR Calculator
function calculateBMR() {
    const gender = document.querySelector('input[name="gender-bmr"]:checked').value;
    const age = parseFloat(document.getElementById('age-bmr').value);
    const height = parseFloat(document.getElementById('height-bmr').value);
    const weight = parseFloat(document.getElementById('weight-bmr').value);
    const formula = document.getElementById('formula').value;

    if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById('bmr-result').innerHTML = '<p class="warning">請輸入有效的數值</p>';
        return;
    }

    let bmr;
    let formulaName;

    if (formula === 'mifflin') {
        formulaName = 'Mifflin-St Jeor 公式';
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    } else { // harris
        formulaName = 'Harris-Benedict 公式';
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }

    const genderText = gender === 'male' ? '男性' : '女性';

    document.getElementById('bmr-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">您的基礎代謝率 (${formulaName})</div>
            <div class="metric-value">${Math.round(bmr)} <span style="font-size:0.5em;">大卡/日</span></div>
            <p>性別：${genderText} | 年齡：${age}歲</p>
            <div class="health-tip">
                <h4>基礎代謝率說明</h4>
                <p>這是您身體在完全休息狀態下維持基本生理功能所需的最低熱量。即使整天躺著不動，身體也需要這些熱量來維持呼吸、心跳、細胞修復等基本功能。</p>
            </div>
        </div>
    `;
}

// TDEE Calculator
function calculateTDEE() {
    const gender = document.querySelector('input[name="gender-tdee"]:checked').value;
    const age = parseFloat(document.getElementById('age-tdee').value);
    const height = parseFloat(document.getElementById('height-tdee').value);
    const weight = parseFloat(document.getElementById('weight-tdee').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById('tdee-result').innerHTML = '<p class="warning">請輸入有效的數值</p>';
        return;
    }

    // Calculate BMR using Mifflin-St Jeor formula
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = bmr * activity;
    
    let activityLevel;
    switch(activity) {
        case 1.2: activityLevel = '久坐（幾乎沒有運動）'; break;
        case 1.375: activityLevel = '輕度活動（每週1-3次輕度運動）'; break;
        case 1.55: activityLevel = '中度活動（每週3-5次中度運動）'; break;
        case 1.725: activityLevel = '高強度活動（每週6-7次運動）'; break;
        case 1.9: activityLevel = '極高強度（體力勞動或每日2次運動）'; break;
    }

    const genderText = gender === 'male' ? '男性' : '女性';

    document.getElementById('tdee-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">您的每日總消耗熱量 (TDEE)</div>
            <div class="metric-value">${Math.round(tdee)} <span style="font-size:0.5em;">大卡/日</span></div>
            <p>基礎代謝率：${Math.round(bmr)} 大卡/日</p>
            <p>活動係數：${activity} (${activityLevel})</p>
            <div class="health-tip">
                <h4>體重管理建議</h4>
                <p><strong>維持體重：</strong>每日攝取約 ${Math.round(tdee)} 大卡</p>
                <p><strong>減重：</strong>每日攝取約 ${Math.round(tdee - 500)} 大卡 (每週減重約0.5公斤)</p>
                <p><strong>增重：</strong>每日攝取約 ${Math.round(tdee + 500)} 大卡 (每週增重約0.5公斤)</p>
            </div>
        </div>
    `;
}

// Body Fat Calculator input visibility toggle
function toggleBodyFatInputs() {
    const method = document.getElementById('method').value;
    const gender = document.querySelector('input[name="gender-bf"]:checked').value;
    const neckGroup = document.getElementById('neck-group');
    const hipGroup = document.getElementById('hip-group');
    const weightGroup = document.getElementById('weight-group-ymca');

    if (method === 'navy') {
        neckGroup.style.display = 'block';
        weightGroup.style.display = 'none';
        if (gender === 'female') {
            hipGroup.style.display = 'block';
        } else {
            hipGroup.style.display = 'none';
        }
    } else { // YMCA
        neckGroup.style.display = 'none';
        hipGroup.style.display = 'none';
        weightGroup.style.display = 'block';
    }
}

// Add event listeners for gender change in body fat calculator
document.addEventListener('DOMContentLoaded', function() {
    const genderRadios = document.querySelectorAll('input[name="gender-bf"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', toggleBodyFatInputs);
    });
});

// Body Fat Calculator
function calculateBodyFat() {
    const gender = document.querySelector('input[name="gender-bf"]:checked').value;
    const method = document.getElementById('method').value;
    const height = parseFloat(document.getElementById('height-bf').value);
    const waist = parseFloat(document.getElementById('waist').value);

    if (!height || !waist || height <= 0 || waist <= 0) {
        document.getElementById('bodyfat-result').innerHTML = '<p class="warning">請輸入有效的數值</p>';
        return;
    }

    let bodyFat;
    let methodName;

    if (method === 'navy') {
        methodName = 'US Navy 公式';
        const neck = parseFloat(document.getElementById('neck').value);
        
        if (!neck || neck <= 0) {
            document.getElementById('bodyfat-result').innerHTML = '<p class="warning">請輸入有效的頸圍數值</p>';
            return;
        }

        if (gender === 'male') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            const hip = parseFloat(document.getElementById('hip').value);
            if (!hip || hip <= 0) {
                document.getElementById('bodyfat-result').innerHTML = '<p class="warning">請輸入有效的臀圍數值</p>';
                return;
            }
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
    } else { // YMCA
        methodName = 'YMCA 公式';
        const weight = parseFloat(document.getElementById('weight-bf').value);
        
        if (!weight || weight <= 0) {
            document.getElementById('bodyfat-result').innerHTML = '<p class="warning">請輸入有效的體重數值</p>';
            return;
        }

        if (gender === 'male') {
            bodyFat = (4.15 * waist - 0.082 * weight - 76.76);
        } else {
            bodyFat = (4.15 * waist - 0.082 * weight - 65.01);
        }
    }

    let category, categoryClass, advice;
    
    if (gender === 'male') {
        if (bodyFat < 6) {
            category = '過低（危險）';
            categoryClass = 'bmi-underweight';
            advice = '體脂肪過低可能影響健康，建議諮詢專業人員';
        } else if (bodyFat < 13) {
            category = '運動員等級';
            categoryClass = 'bmi-normal';
            advice = '優秀的身體組成，適合競技運動';
        } else if (bodyFat < 17) {
            category = '健身等級';
            categoryClass = 'bmi-normal';
            advice = '良好的身體組成，繼續維持';
        } else if (bodyFat < 25) {
            category = '一般等級';
            categoryClass = 'bmi-normal';
            advice = '健康的體脂肪範圍';
        } else {
            category = '過高';
            categoryClass = 'bmi-obese';
            advice = '建議增加有氧運動和肌力訓練';
        }
    } else {
        if (bodyFat < 14) {
            category = '過低（危險）';
            categoryClass = 'bmi-underweight';
            advice = '體脂肪過低可能影響健康，建議諮詢專業人員';
        } else if (bodyFat < 21) {
            category = '運動員等級';
            categoryClass = 'bmi-normal';
            advice = '優秀的身體組成，適合競技運動';
        } else if (bodyFat < 25) {
            category = '健身等級';
            categoryClass = 'bmi-normal';
            advice = '良好的身體組成，繼續維持';
        } else if (bodyFat < 32) {
            category = '一般等級';
            categoryClass = 'bmi-normal';
            advice = '健康的體脂肪範圍';
        } else {
            category = '過高';
            categoryClass = 'bmi-obese';
            advice = '建議增加有氧運動和肌力訓練';
        }
    }

    const genderText = gender === 'male' ? '男性' : '女性';

    document.getElementById('bodyfat-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">您的體脂肪率 (${methodName})</div>
            <div class="metric-value">${bodyFat.toFixed(1)}%</div>
            <p class="${categoryClass}">分類：${category}</p>
            <p>性別：${genderText}</p>
            <div class="health-tip">
                <h4>健康建議</h4>
                <p>${advice}</p>
            </div>
        </div>
    `;
}

// FFMI Calculator
function calculateFFMI() {
    const height = parseFloat(document.getElementById('height-ffmi').value);
    const weight = parseFloat(document.getElementById('weight-ffmi').value);
    const bodyFatPercentage = parseFloat(document.getElementById('bodyfat-ffmi').value);

    if (!height || !weight || !bodyFatPercentage || height <= 0 || weight <= 0 || bodyFatPercentage < 0 || bodyFatPercentage > 50) {
        document.getElementById('ffmi-result').innerHTML = '<p class="warning">請輸入有效的數值（體脂肪率應在0-50%之間）</p>';
        return;
    }

    const heightInMeters = height / 100;
    const fatMass = weight * (bodyFatPercentage / 100);
    const leanMass = weight - fatMass;
    const ffmi = leanMass / (heightInMeters * heightInMeters);
    const normalizedFFMI = ffmi + 6.1 * (1.8 - heightInMeters);

    let category, categoryClass, advice;
    
    if (normalizedFFMI < 16) {
        category = '肌肉量不足';
        categoryClass = 'bmi-underweight';
        advice = '建議進行肌力訓練並增加蛋白質攝取';
    } else if (normalizedFFMI < 18) {
        category = '一般水準';
        categoryClass = 'bmi-normal';
        advice = '正常的肌肉量，可持續訓練提升';
    } else if (normalizedFFMI < 20) {
        category = '良好水準';
        categoryClass = 'bmi-normal';
        advice = '良好的肌肉發達程度';
    } else if (normalizedFFMI < 22) {
        category = '優秀水準';
        categoryClass = 'bmi-normal';
        advice = '優秀的肌肉發達程度';
    } else if (normalizedFFMI < 25) {
        category = '卓越水準';
        categoryClass = 'bmi-normal';
        advice = '卓越的肌肉發達程度，接近自然訓練上限';
    } else {
        category = '超出自然上限';
        categoryClass = 'bmi-overweight';
        advice = '可能超出自然訓練上限，建議重新檢查測量數據';
    }

    const naturalLimit = normalizedFFMI >= 25 ? '⚠️ 可能超出自然訓練上限' : '✅ 在自然訓練範圍內';

    document.getElementById('ffmi-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">您的 FFMI 指數</div>
            <div class="metric-value">${ffmi.toFixed(1)}</div>
            <p>標準化 FFMI：${normalizedFFMI.toFixed(1)}</p>
            <p class="${categoryClass}">分類：${category}</p>
            <p>去脂體重：${leanMass.toFixed(1)} kg</p>
            <p>${naturalLimit}</p>
            <div class="health-tip">
                <h4>FFMI 說明</h4>
                <p>FFMI 反映相對於身高的肌肉量。自然訓練者的 FFMI 上限通常在 25 左右。${advice}</p>
            </div>
        </div>
    `;
}


// Export to Image function
function exportToImage() {
    // Check if there are any results to export
    const results = document.querySelectorAll('.result');
    const hasResults = Array.from(results).some(result => 
        result.innerHTML.trim() && !result.innerHTML.includes('請輸入') && !result.innerHTML.includes('warning')
    );
    
    if (!hasResults) {
        alert('請先進行至少一項健康計算後再匯出結果');
        return;
    }
    
    // Create a summary container
    const summaryDiv = document.createElement('div');
    summaryDiv.style.cssText = `
        background: white;
        padding: 40px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        width: 900px;
        margin: 0 auto;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: -9999px;
        left: -9999px;
        z-index: -1;
    `;
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = '健康計算報告';
    title.style.cssText = `
        text-align: center;
        color: #2c3e50;
        margin-bottom: 20px;
        font-size: 2.2em;
        font-weight: 300;
    `;
    summaryDiv.appendChild(title);
    
    // Add date
    const date = document.createElement('p');
    const today = new Date();
    date.textContent = `報告日期: ${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    date.style.cssText = `
        text-align: center;
        color: #7f8c8d;
        margin-bottom: 35px;
        font-size: 1.1em;
    `;
    summaryDiv.appendChild(date);
    
    // Add results (including questionnaire results)
    results.forEach(result => {
        if (result.innerHTML.trim() && !result.innerHTML.includes('請輸入') && !result.innerHTML.includes('warning')) {
            const section = result.closest('.calculator-section');
            if (!section) return;
            
            let sectionTitle = section.querySelector('h2').textContent;
            
            // Handle questionnaire results specifically
            if (section.id === 'questionnaire') {
                if (result.id === 'sppb-result') {
                    sectionTitle = 'SPPB - 簡易身體功能測試';
                } else if (result.id === 'parq-result') {
                    sectionTitle = 'PAR-Q+ - 運動準備問卷';
                }
            }
            
            // Create container for this result
            const container = document.createElement('div');
            container.style.cssText = `
                margin: 25px 0;
                page-break-inside: avoid;
            `;
            
            // Add section title
            const titleEl = document.createElement('h3');
            titleEl.textContent = sectionTitle;
            titleEl.style.cssText = `
                color: #2c3e50;
                margin-bottom: 15px;
                font-size: 1.4em;
                border-bottom: 3px solid #667eea;
                padding-bottom: 8px;
                font-weight: 500;
            `;
            container.appendChild(titleEl);
            
            // Clone and style the result
            const resultClone = result.cloneNode(true);
            resultClone.style.cssText = `
                margin: 0;
                padding: 20px;
                border: 2px solid #e1e8ed;
                border-radius: 12px;
                background: #f8f9fa;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            `;
            
            // Style metric cards within the result
            const metricCards = resultClone.querySelectorAll('.metric-card');
            metricCards.forEach(card => {
                card.style.cssText = `
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 15px 0;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                    border: 1px solid #f1f3f4;
                `;
            });
            
            // Style metric values
            const metricValues = resultClone.querySelectorAll('.metric-value');
            metricValues.forEach(value => {
                value.style.cssText = `
                    font-size: 2.5em;
                    font-weight: bold;
                    text-align: center;
                    margin: 15px 0;
                    color: #26a69a;
                `;
            });
            
            // Style health tips
            const healthTips = resultClone.querySelectorAll('.health-tip');
            healthTips.forEach(tip => {
                tip.style.cssText = `
                    background: #e0f2f1;
                    border-left: 4px solid #26a69a;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 0 8px 8px 0;
                `;
            });

            // Style questionnaire specific elements
            const questionnaireResults = resultClone.querySelectorAll('.questionnaire-result');
            questionnaireResults.forEach(qResult => {
                qResult.style.cssText = `
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin: 20px 0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    border: 2px solid #26a69a;
                `;
            });

            const scoreValues = resultClone.querySelectorAll('.score-value');
            scoreValues.forEach(score => {
                score.style.cssText = `
                    font-size: 3em;
                    font-weight: bold;
                    color: #26a69a;
                    display: block;
                `;
            });

            const riskLevels = resultClone.querySelectorAll('.risk-level');
            riskLevels.forEach(risk => {
                risk.style.cssText = `
                    padding: 15px;
                    border-radius: 8px;
                    margin: 15px 0;
                    font-weight: 600;
                    text-align: center;
                    font-size: 1.1em;
                `;
                
                // Apply specific risk level colors
                if (risk.classList.contains('risk-low')) {
                    risk.style.cssText += `
                        background: #d4edda;
                        color: #155724;
                        border: 1px solid #c3e6cb;
                    `;
                } else if (risk.classList.contains('risk-medium')) {
                    risk.style.cssText += `
                        background: #fff3cd;
                        color: #856404;
                        border: 1px solid #ffeaa7;
                    `;
                } else if (risk.classList.contains('risk-high')) {
                    risk.style.cssText += `
                        background: #f8d7da;
                        color: #721c24;
                        border: 1px solid #f5c6cb;
                    `;
                }
            });

            const recommendations = resultClone.querySelectorAll('.recommendations');
            recommendations.forEach(rec => {
                rec.style.cssText = `
                    background: #e0f2f1;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border-left: 4px solid #26a69a;
                `;
            });
            
            container.appendChild(resultClone);
            summaryDiv.appendChild(container);
        }
    });
    
    // Add footer
    const footer = document.createElement('p');
    footer.textContent = '※ 本報告僅供參考，具體健康狀況請諮詢專業醫療人員';
    footer.style.cssText = `
        text-align: center;
        color: #7f8c8d;
        margin-top: 35px;
        font-size: 0.9em;
        border-top: 2px solid #e1e8ed;
        padding-top: 20px;
        font-style: italic;
    `;
    summaryDiv.appendChild(footer);
    
    // Temporarily add to body
    document.body.appendChild(summaryDiv);
    
    // Convert to canvas and download
    if (window.html2canvas) {
        html2canvas(summaryDiv, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            width: 900,
            height: summaryDiv.scrollHeight,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            try {
                const link = document.createElement('a');
                const today = new Date();
                const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
                link.download = `健康計算報告_${dateStr}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success message
                alert('圖片匯出成功！');
            } catch (error) {
                console.error('匯出失敗:', error);
                alert('匯出失敗，請稍後再試');
            } finally {
                // Remove temporary element
                if (document.body.contains(summaryDiv)) {
                    document.body.removeChild(summaryDiv);
                }
            }
        }).catch(error => {
            console.error('html2canvas 錯誤:', error);
            alert('圖片生成失敗，請稍後再試');
            // Remove temporary element
            if (document.body.contains(summaryDiv)) {
                document.body.removeChild(summaryDiv);
            }
        });
    } else {
        alert('圖片匯出功能暫時無法使用，請檢查網路連接');
        // Remove temporary element
        if (document.body.contains(summaryDiv)) {
            document.body.removeChild(summaryDiv);
        }
    }
}

// SPPB Calculator
function calculateSPPB() {
    const balance = document.querySelector('input[name="balance"]:checked');
    const walktime = document.querySelector('input[name="walktime"]:checked');
    const chairstand = document.querySelector('input[name="chairstand"]:checked');

    if (!balance || !walktime || !chairstand) {
        document.getElementById('sppb-result').innerHTML = '<p class="warning">請完成所有三項測試的選擇</p>';
        return;
    }

    const balanceScore = parseInt(balance.value);
    const walktimeScore = parseInt(walktime.value);
    const chairstandScore = parseInt(chairstand.value);
    const totalScore = balanceScore + walktimeScore + chairstandScore;

    let riskLevel, riskClass, interpretation, recommendations;

    if (totalScore <= 3) {
        riskLevel = '嚴重功能限制';
        riskClass = 'risk-high';
        interpretation = '身體功能顯著受限，跌倒風險極高';
        recommendations = [
            '強烈建議立即諮詢復健科或老年醫學科醫師',
            '可能需要物理治療師指導的功能訓練',
            '居家環境安全改善，移除跌倒風險因子',
            '考慮使用輔助行走器具',
            '家人應提供更多日常生活協助'
        ];
    } else if (totalScore <= 6) {
        riskLevel = '中度功能限制';
        riskClass = 'risk-medium';
        interpretation = '身體功能中等程度受限，有跌倒風險';
        recommendations = [
            '建議諮詢醫師或物理治療師評估',
            '參與適合的平衡和肌力訓練課程',
            '逐步增加日常活動量',
            '注意居家安全，安裝扶手等輔助設施',
            '定期追蹤身體功能變化'
        ];
    } else if (totalScore <= 9) {
        riskLevel = '輕度功能限制';
        riskClass = 'risk-medium';
        interpretation = '身體功能輕微受限，仍有改善空間';
        recommendations = [
            '持續規律的運動習慣',
            '加強平衡訓練和肌力訓練',
            '參與團體運動活動',
            '保持積極的生活態度',
            '定期健康檢查'
        ];
    } else {
        riskLevel = '功能良好';
        riskClass = 'risk-low';
        interpretation = '身體功能優良，維持現有活動水準';
        recommendations = [
            '繼續保持目前的運動習慣',
            '可嘗試更具挑戰性的運動項目',
            '定期評估身體功能以預防退化',
            '作為同齡人的良好示範',
            '注意均衡飲食和充足睡眠'
        ];
    }

    document.getElementById('sppb-result').innerHTML = `
        <div class="questionnaire-result">
            <div class="score-display">
                <span class="score-value">${totalScore}</span>
                <div class="score-label">SPPB 總分 (滿分12分)</div>
            </div>
            
            <div class="score-breakdown">
                <p><strong>平衡測試：</strong>${balanceScore} 分</p>
                <p><strong>步行速度：</strong>${walktimeScore} 分</p>
                <p><strong>椅子起立：</strong>${chairstandScore} 分</p>
            </div>

            <div class="risk-level ${riskClass}">
                ${riskLevel}
            </div>

            <p><strong>結果解釋：</strong>${interpretation}</p>

            <div class="recommendations">
                <h4>建議事項</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="health-tip">
                <h4>SPPB 重要性</h4>
                <p>SPPB分數與未來跌倒風險、住院率、失能風險及死亡率密切相關。定期評估有助於早期發現功能衰退，及時介入預防。</p>
            </div>
        </div>
    `;
}

// PAR-Q Calculator
function calculatePARQ() {
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
    const answers = {};
    let allAnswered = true;
    let yesCount = 0;

    // Check if all questions are answered
    questions.forEach(question => {
        const answer = document.querySelector(`input[name="${question}"]:checked`);
        if (!answer) {
            allAnswered = false;
        } else {
            answers[question] = answer.value;
            if (answer.value === 'yes') {
                yesCount++;
            }
        }
    });

    if (!allAnswered) {
        document.getElementById('parq-result').innerHTML = '<p class="warning">請回答所有問題</p>';
        return;
    }

    let riskLevel, riskClass, interpretation, recommendations;

    if (yesCount === 0) {
        riskLevel = '低風險';
        riskClass = 'risk-low';
        interpretation = '您目前適合開始或增加體育活動';
        recommendations = [
            '可以安全地開始輕到中等強度的運動計畫',
            '建議從低強度運動開始，逐漸增加',
            '每週至少150分鐘中等強度有氧運動',
            '每週2-3次肌力訓練',
            '運動前進行適當暖身，運動後進行緩和運動'
        ];
    } else if (yesCount <= 2) {
        riskLevel = '中等風險';
        riskClass = 'risk-medium';
        interpretation = '建議在開始運動前諮詢醫療專業人員';
        recommendations = [
            '諮詢醫師或運動醫學專家的建議',
            '可能需要運動前的醫學檢查',
            '選擇適合的運動類型和強度',
            '考慮在專業指導下開始運動計畫',
            '密切監控運動時的身體反應'
        ];
    } else {
        riskLevel = '高風險';
        riskClass = 'risk-high';
        interpretation = '強烈建議在開始任何運動計畫前諮詢醫師';
        recommendations = [
            '必須先接受醫師的詳細評估',
            '可能需要心電圖或其他醫學檢查',
            '在醫療監督下開始運動計畫',
            '選擇低衝擊、低強度的運動',
            '定期醫療追蹤和評估'
        ];
    }

    // Create detailed analysis of specific risks
    let specificRisks = [];
    if (answers.q1 === 'yes') specificRisks.push('心臟疾病');
    if (answers.q2 === 'yes') specificRisks.push('胸痛症狀');
    if (answers.q3 === 'yes') specificRisks.push('平衡或意識問題');
    if (answers.q4 === 'yes') specificRisks.push('高血壓');
    if (answers.q5 === 'yes') specificRisks.push('骨骼或關節問題');
    if (answers.q6 === 'yes') specificRisks.push('心血管藥物使用');
    if (answers.q7 === 'yes') specificRisks.push('其他健康考量');

    document.getElementById('parq-result').innerHTML = `
        <div class="questionnaire-result">
            <div class="score-display">
                <span class="score-value">${yesCount}</span>
                <div class="score-label">「是」的答案數量</div>
            </div>

            <div class="risk-level ${riskClass}">
                ${riskLevel}
            </div>

            <p><strong>評估結果：</strong>${interpretation}</p>

            ${specificRisks.length > 0 ? `
                <div class="specific-risks">
                    <h4>需要關注的健康因素：</h4>
                    <ul>
                        ${specificRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="recommendations">
                <h4>建議事項</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="health-tip">
                <h4>PAR-Q+ 重要提醒</h4>
                <p>本問卷是運動前健康篩檢的初步工具。即使結果顯示低風險，如在運動過程中出現任何不適症狀，應立即停止運動並尋求醫療協助。</p>
            </div>
        </div>
    `;
}