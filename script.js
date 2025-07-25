
// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('健康計算機頁面載入完成');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorSections = document.querySelectorAll('.calculator-section');
    
    console.log('找到按鈕數量:', tabButtons.length);
    console.log('找到section數量:', calculatorSections.length);

    tabButtons.forEach((button, index) => {
        console.log(`按鈕 ${index}:`, button.getAttribute('data-tab'));
        
        button.addEventListener('click', function() {
            console.log('按鈕被點擊:', this.getAttribute('data-tab'));
            
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            calculatorSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(tabId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('成功切換到:', tabId);
            } else {
                console.error('找不到section:', tabId);
            }
        });
    });


    // Initialize composition tab switching
    const compositionTabButtons = document.querySelectorAll('.composition-tab-btn');
    const compositionForms = document.querySelectorAll('.composition-form');

    compositionTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const compositionId = this.getAttribute('data-composition');
            
            // Remove active class from all composition buttons and forms
            compositionTabButtons.forEach(btn => btn.classList.remove('active'));
            compositionForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            document.getElementById(compositionId + '-form').classList.add('active');
        });
    });

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
            category = '過重';
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


// Body Fat Calculator
function calculateBodyFat() {
    const gender = document.querySelector('input[name="gender-bf"]:checked').value;
    const age = parseFloat(document.getElementById('age-bf').value);
    const height = parseFloat(document.getElementById('height-bf').value);
    const weight = parseFloat(document.getElementById('weight-bf').value);

    if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById('bodyfat-result').innerHTML = '<p class="warning">請輸入有效的年齡、身高和體重數值</p>';
        return;
    }

    // Calculate BMI first
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Calculate body fat using the new formula
    let bodyFat;
    if (gender === 'male') {
        bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
    } else {
        bodyFat = 1.2 * bmi + 0.23 * age - 5.4;
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
            <div class="metric-label">您的體脂肪率 (研究公式)</div>
            <div class="metric-value">${bodyFat.toFixed(1)}%</div>
            <p class="${categoryClass}">分類：${category}</p>
            <p>性別：${genderText} | 年齡：${age}歲 | BMI：${bmi.toFixed(1)}</p>
            <div class="health-tip">
                <h4>計算公式</h4>
                <p>${genderText}：體脂率 = 1.2 × BMI + 0.23 × 年齡 ${gender === 'male' ? '- 16.2' : '- 5.4'}</p>
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
            // Remove temporary element on error
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

// SARC-F Calculator
function calculateSARCF() {
    const questions = ['sarcf-q1', 'sarcf-q2', 'sarcf-q3', 'sarcf-q4', 'sarcf-q5'];
    const answers = {};
    let allAnswered = true;
    let totalScore = 0;

    // Check if all questions are answered
    questions.forEach(question => {
        const answer = document.querySelector(`input[name="${question}"]:checked`);
        if (!answer) {
            allAnswered = false;
        } else {
            answers[question] = parseInt(answer.value);
            totalScore += parseInt(answer.value);
        }
    });

    if (!allAnswered) {
        document.getElementById('sarcf-result').innerHTML = '<p class="warning">請回答所有問題</p>';
        return;
    }

    let riskLevel, riskClass, interpretation, recommendations;

    if (totalScore >= 4) {
        riskLevel = '肌少症篩檢陽性';
        riskClass = 'risk-high';
        interpretation = '您的 SARC-F 分數顯示可能有肌少症風險';
        recommendations = [
            '建議盡快諮詢醫師或復健科專科醫師',
            '進行進一步的肌少症診斷檢查（肌肉質量、肌力、身體功能評估）',
            '開始或加強阻力訓練和蛋白質攝取',
            '考慮營養諮詢以優化蛋白質和營養素攝取'
        ];
    } else {
        riskLevel = '肌少症篩檢陰性';
        riskClass = 'risk-low';
        interpretation = '您的 SARC-F 分數在正常範圍內';
        recommendations = [
            '維持規律的運動習慣，特別是阻力訓練',
            '確保足夠的蛋白質攝取（每公斤體重1.2-1.6克）',
            '定期進行肌少症篩檢，特別是60歲以上',
            '保持健康的生活方式和均衡飲食'
        ];
    }

    const detailBreakdown = `
        <div class="score-breakdown">
            <h4>各項目得分明細：</h4>
            <p>1. 握力：${answers['sarcf-q1']} 分</p>
            <p>2. 輔助行走：${answers['sarcf-q2']} 分</p>
            <p>3. 起身：${answers['sarcf-q3']} 分</p>
            <p>4. 爬樓梯：${answers['sarcf-q4']} 分</p>
            <p>5. 跌倒：${answers['sarcf-q5']} 分</p>
        </div>
    `;

    document.getElementById('sarcf-result').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">SARC-F 總分</div>
            <div class="metric-value">${totalScore}</div>
            <p class="${riskClass}">篩檢結果：${riskLevel}</p>
            <div class="health-tip">
                <h4>評估說明</h4>
                <p>${interpretation}</p>
                <h4>建議事項</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                ${detailBreakdown}
            </div>
        </div>
    `;
    
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

// 壓力指數測量表計算函數
function calculateStress() {
    let totalScore = 0;
    const questions = ['stress-q1', 'stress-q2', 'stress-q3', 'stress-q4', 'stress-q5', 'stress-q6', 'stress-q7', 'stress-q8', 'stress-q9', 'stress-q10', 'stress-q11', 'stress-q12'];
    
    let allAnswered = true;
    
    for (let i = 0; i < questions.length; i++) {
        const radios = document.getElementsByName(questions[i]);
        let answered = false;
        
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                totalScore += parseInt(radios[j].value);
                answered = true;
                break;
            }
        }
        
        if (!answered) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        document.getElementById('stress-result').innerHTML = '<p class="warning">請回答所有問題</p>';
        return;
    }
    
    let stressLevel, stressClass, description, recommendations;
    
    if (totalScore <= 3) {
        stressLevel = '輕度壓力';
        stressClass = 'stress-low';
        description = '您目前的壓力狀況良好，身心狀態相對穩定';
        recommendations = [
            '繼續維持健康的生活型態',
            '保持規律的作息和運動習慣',
            '維持良好的社交關係',
            '適度的工作與休閒平衡',
            '定期進行壓力自我檢測'
        ];
    } else if (totalScore <= 6) {
        stressLevel = '中度壓力';
        stressClass = 'stress-medium';
        description = '您開始出現一些壓力症狀，需要適當調整生活步調';
        recommendations = [
            '檢視並調整工作負荷',
            '增加休閒娛樂活動時間',
            '學習壓力管理技巧（如深呼吸、冥想）',
            '改善睡眠品質，確保充足休息',
            '與親友分享心情，尋求支持',
            '考慮參加壓力管理課程'
        ];
    } else if (totalScore <= 9) {
        stressLevel = '重度壓力';
        stressClass = 'stress-high';
        description = '您的壓力症狀已經比較明顯，建議尋求專業協助';
        recommendations = [
            '建議諮詢心理師或精神科醫師',
            '考慮參加心理諮商或治療',
            '學習專業的壓力管理技巧',
            '調整工作內容或尋求職場支援',
            '規律運動，特別是有氧運動',
            '避免過度使用咖啡因或酒精',
            '建立穩定的社會支持系統'
        ];
    } else {
        stressLevel = '極重度壓力';
        stressClass = 'stress-severe';
        description = '您處於嚴重的壓力狀態，強烈建議立即尋求專業醫療協助';
        recommendations = [
            '立即諮詢醫師或心理健康專業人員',
            '可能需要藥物治療配合心理治療',
            '暫時減少工作壓力或申請病假',
            '尋求家人朋友的密切支持',
            '避免做重大決定',
            '建立每日的自我照護計畫',
            '定期醫療追蹤和評估'
        ];
    }
    
    // 分析具體症狀領域
    const symptomAreas = [];
    if (document.querySelector('input[name="stress-q1"]:checked')?.value === '1') symptomAreas.push('工作壓力');
    if (document.querySelector('input[name="stress-q2"]:checked')?.value === '1') symptomAreas.push('睡眠障礙');
    if (document.querySelector('input[name="stress-q3"]:checked')?.value === '1') symptomAreas.push('情緒困擾');
    if (document.querySelector('input[name="stress-q4"]:checked')?.value === '1') symptomAreas.push('認知功能');
    if (document.querySelector('input[name="stress-q5"]:checked')?.value === '1') symptomAreas.push('食慾變化');
    if (document.querySelector('input[name="stress-q6"]:checked')?.value === '1') symptomAreas.push('免疫力下降');
    if (document.querySelector('input[name="stress-q7"]:checked')?.value === '1') symptomAreas.push('疲勞倦怠');
    if (document.querySelector('input[name="stress-q8"]:checked')?.value === '1') symptomAreas.push('身體不適');
    if (document.querySelector('input[name="stress-q9"]:checked')?.value === '1') symptomAreas.push('人際關係');
    if (document.querySelector('input[name="stress-q10"]:checked')?.value === '1') symptomAreas.push('專注力問題');
    if (document.querySelector('input[name="stress-q11"]:checked')?.value === '1') symptomAreas.push('焦慮恐懼');
    if (document.querySelector('input[name="stress-q12"]:checked')?.value === '1') symptomAreas.push('外觀變化');
    
    document.getElementById('stress-result').innerHTML = `
        <div class="questionnaire-result">
            <div class="score-display">
                <span class="score-value">${totalScore}</span>
                <div class="score-label">總分 (滿分12分)</div>
            </div>

            <div class="risk-level ${stressClass}">
                ${stressLevel}
            </div>

            <p><strong>評估結果：</strong>${description}</p>

            ${symptomAreas.length > 0 ? `
                <div class="symptom-areas">
                    <h4>主要壓力症狀領域：</h4>
                    <ul>
                        ${symptomAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="recommendations">
                <h4>建議改善方案</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="health-tip">
                <h4>壓力管理小貼士</h4>
                <div class="stress-tips">
                    <div class="tip-category">
                        <strong>急性壓力緩解技巧：</strong>
                        <ul>
                            <li>4-7-8呼吸法（吸氣4秒，憋氣7秒，呼氣8秒）</li>
                            <li>肌肉漸進式放鬆</li>
                            <li>短暫散步或伸展運動</li>
                            <li>聽音樂或進行冥想</li>
                        </ul>
                    </div>
                    <div class="tip-category">
                        <strong>長期壓力管理策略：</strong>
                        <ul>
                            <li>建立規律的運動習慣</li>
                            <li>培養興趣愛好</li>
                            <li>學習時間管理技巧</li>
                            <li>建立良好的支持網絡</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="warning-note">
                <h4>重要提醒</h4>
                <p>本量表僅為初步評估工具。如果壓力症狀持續超過2週且影響日常生活，或有自傷想法，請立即尋求專業醫療協助。</p>
            </div>
        </div>
    `;
}

// 飲食行為測量表計算函數
function calculateEating() {
    let totalScore = 0;
    const questions = ['eating-q1', 'eating-q2', 'eating-q3', 'eating-q4', 'eating-q5', 'eating-q6', 'eating-q7', 'eating-q8', 'eating-q9', 'eating-q10', 'eating-q11', 'eating-q12'];
    
    let allAnswered = true;
    
    for (let i = 0; i < questions.length; i++) {
        const radios = document.getElementsByName(questions[i]);
        let answered = false;
        
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                totalScore += parseInt(radios[j].value);
                answered = true;
                break;
            }
        }
        
        if (!answered) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        document.getElementById('eating-result').innerHTML = '<p class="warning">請回答所有問題</p>';
        return;
    }
    
    let eatingLevel, eatingClass, description, recommendations;
    
    if (totalScore <= 12) {
        eatingLevel = '飲食行為不良';
        eatingClass = 'eating-poor';
        description = '哎呀！您的飲食行為很不健康，建議積極調整飲食習慣';
        recommendations = [
            '立即開始規律三餐，設定固定用餐時間',
            '停止宵夜和非正餐時間進食習慣',
            '戒除含糖飲料，改喝白開水',
            '減少油炸和高脂肪食物攝取',
            '增加蔬菜水果的攝取量',
            '學習慢食技巧，每口食物咀嚼20-30下',
            '尋求營養師專業諮詢制定飲食計畫'
        ];
    } else if (totalScore <= 20) {
        eatingLevel = '飲食行為待改善';
        eatingClass = 'eating-fair';
        description = '您的飲食習慣略有不足，需要持續努力改善';
        recommendations = [
            '加強正餐時間的規律性',
            '減少情緒性進食的頻率',
            '增加健康食物的選擇比例',
            '改善進食速度，學習細嚼慢嚥',
            '控制看電視或使用電腦時的進食',
            '選擇低脂乳製品取代全脂產品',
            '建立健康的餐間點心選擇'
        ];
    } else if (totalScore <= 30) {
        eatingLevel = '飲食行為良好';
        eatingClass = 'eating-good';
        description = '加油！您的飲食行為大致良好，繼續改善小缺點即可';
        recommendations = [
            '維持現有的良好飲食習慣',
            '持續優化食物選擇品質',
            '強化蔬果攝取的多樣性',
            '完善水分攝取習慣',
            '偶爾檢視並調整飲食內容',
            '學習更多營養知識',
            '成為家人朋友的健康飲食榜樣'
        ];
    } else {
        eatingLevel = '飲食行為優秀';
        eatingClass = 'eating-excellent';
        description = '太棒了！您的飲食習慣非常健康，請繼續保持';
        recommendations = [
            '繼續維持優良的飲食習慣',
            '定期檢視飲食內容的營養均衡',
            '適時調整季節性食材攝取',
            '分享健康飲食經驗給他人',
            '持續關注最新的營養研究',
            '維持良好的飲食與運動平衡',
            '成為健康生活的推廣者'
        ];
    }
    
    // 分析具體問題領域
    const problemAreas = [];
    if (document.querySelector('input[name="eating-q1"]:checked')?.value <= '1') problemAreas.push('用餐規律性不足');
    if (document.querySelector('input[name="eating-q2"]:checked')?.value <= '1') problemAreas.push('甜食零食攝取過多');
    if (document.querySelector('input[name="eating-q3"]:checked')?.value <= '1') problemAreas.push('咀嚼習慣不良');
    if (document.querySelector('input[name="eating-q4"]:checked')?.value <= '1') problemAreas.push('含糖飲料攝取過多');
    if (document.querySelector('input[name="eating-q5"]:checked')?.value <= '1') problemAreas.push('乳製品選擇需改善');
    if (document.querySelector('input[name="eating-q6"]:checked')?.value <= '1') problemAreas.push('蔬果攝取不足');
    if (document.querySelector('input[name="eating-q7"]:checked')?.value <= '1') problemAreas.push('高脂食物攝取過多');
    if (document.querySelector('input[name="eating-q8"]:checked')?.value <= '1') problemAreas.push('分心進食習慣');
    if (document.querySelector('input[name="eating-q9"]:checked')?.value <= '1') problemAreas.push('情緒性進食');
    if (document.querySelector('input[name="eating-q10"]:checked')?.value <= '1') problemAreas.push('進食速度過快');
    if (document.querySelector('input[name="eating-q11"]:checked')?.value <= '1') problemAreas.push('宵夜習慣');
    if (document.querySelector('input[name="eating-q12"]:checked')?.value <= '1') problemAreas.push('非正餐時間進食');
    
    document.getElementById('eating-result').innerHTML = `
        <div class="questionnaire-result">
            <div class="score-display">
                <span class="score-value">${totalScore}</span>
                <div class="score-label">總分 (滿分36分)</div>
            </div>

            <div class="risk-level ${eatingClass}">
                ${eatingLevel}
            </div>

            <p><strong>評估結果：</strong>${description}</p>

            ${problemAreas.length > 0 ? `
                <div class="problem-areas">
                    <h4>需要改善的飲食行為：</h4>
                    <ul>
                        ${problemAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="recommendations">
                <h4>改善建議</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="health-tip">
                <h4>健康飲食小貼士</h4>
                <div class="eating-tips">
                    <div class="tip-category">
                        <strong>每日飲食指南：</strong>
                        <ul>
                            <li>全穀雜糧類：每餐1.5-4碗，選擇未精製穀類</li>
                            <li>豆魚蛋肉類：每餐1-2份手掌大小</li>
                            <li>蔬菜類：每餐1-2份拳頭大小</li>
                            <li>水果類：每日2-4份拳頭大小</li>
                            <li>乳品類：每日1.5-2杯，選擇低脂產品</li>
                            <li>油脂類：每日3-7茶匙，選擇好油</li>
                        </ul>
                    </div>
                    <div class="tip-category">
                        <strong>實用飲食技巧：</strong>
                        <ul>
                            <li>使用小盤子控制份量，避免吃到撐</li>
                            <li>餐前喝一杯水，增加飽足感</li>
                            <li>先吃蔬菜再吃肉類和澱粉</li>
                            <li>用餐時放下手機，專心品嘗食物</li>
                            <li>準備健康零食，避免餓過頭亂吃</li>
                            <li>學會看營養標示，選擇健康食品</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="nutrition-note">
                <h4>營養均衡提醒</h4>
                <p>良好的飲食習慣是健康的基石。建議搭配適量運動，維持理想體重，並定期檢查身體狀況。</p>
                <p><strong>特殊情況請諮詢專業：</strong>如有糖尿病、高血壓、腎臟病等慢性疾病，請諮詢營養師制定個人化飲食計畫。</p>
            </div>
        </div>
    `;
}

// FRAX骨折風險評估計算函數
function calculateFRAX() {
    // 基本資料驗證
    const age = parseInt(document.getElementById('frax-age').value);
    const weight = parseFloat(document.getElementById('frax-weight').value);
    const height = parseFloat(document.getElementById('frax-height').value);
    const gender = document.querySelector('input[name="frax-gender"]:checked')?.value;
    
    if (!age || !weight || !height || !gender) {
        document.getElementById('frax-result').innerHTML = '<p class="warning">請填寫所有必填欄位</p>';
        return;
    }
    
    if (age < 40 || age > 90) {
        document.getElementById('frax-result').innerHTML = '<p class="warning">年齡必須在40-90歲之間</p>';
        return;
    }
    
    // 取得風險因子
    const fracture = document.querySelector('input[name="frax-fracture"]:checked')?.value === 'yes';
    const parentHip = document.querySelector('input[name="frax-parent"]:checked')?.value === 'yes';
    const smoking = document.querySelector('input[name="frax-smoking"]:checked')?.value === 'yes';
    const steroid = document.querySelector('input[name="frax-steroid"]:checked')?.value === 'yes';
    const ra = document.querySelector('input[name="frax-ra"]:checked')?.value === 'yes';
    const secondary = document.querySelector('input[name="frax-secondary"]:checked')?.value === 'yes';
    const alcohol = document.querySelector('input[name="frax-alcohol"]:checked')?.value === 'yes';
    const bmd = parseFloat(document.getElementById('frax-bmd').value) || null;
    
    // 確認所有單選題都已回答
    const radioGroups = ['frax-fracture', 'frax-parent', 'frax-smoking', 'frax-steroid', 'frax-ra', 'frax-secondary', 'frax-alcohol'];
    for (let group of radioGroups) {
        if (!document.querySelector(`input[name="${group}"]:checked`)) {
            document.getElementById('frax-result').innerHTML = '<p class="warning">請回答所有問題</p>';
            return;
        }
    }
    
    // 計算BMI
    const bmi = weight / ((height / 100) ** 2);
    
    // 台灣FRAX模型計算（基於台灣流行病學資料）
    // 台灣基準風險 - 根據年齡和性別，參考台灣骨質疏鬆症流行病學資料
    let baseRisk = 0;
    if (gender === 'female') {
        // 台灣女性基準風險（亞洲人種骨折風險相對較低）
        if (age >= 40 && age < 50) baseRisk = 1.2;
        else if (age >= 50 && age < 60) baseRisk = 3.8;
        else if (age >= 60 && age < 70) baseRisk = 7.2;
        else if (age >= 70 && age < 80) baseRisk = 13.5;
        else if (age >= 80) baseRisk = 22.8;
    } else {
        // 台灣男性基準風險
        if (age >= 40 && age < 50) baseRisk = 0.8;
        else if (age >= 50 && age < 60) baseRisk = 2.1;
        else if (age >= 60 && age < 70) baseRisk = 4.8;
        else if (age >= 70 && age < 80) baseRisk = 9.6;
        else if (age >= 80) baseRisk = 17.2;
    }
    
    // 台灣特異性風險乘數
    let riskMultiplier = 1.0;
    
    // BMI影響（亞洲人種特異性調整）
    if (bmi < 18.5) {
        riskMultiplier *= 1.6; // 亞洲人BMI過低影響更大
    } else if (bmi >= 18.5 && bmi < 24) {
        riskMultiplier *= 1.0; // 正常範圍
    } else if (bmi >= 24 && bmi < 27) {
        riskMultiplier *= 0.9; // 輕度過重
    } else if (bmi >= 27) {
        riskMultiplier *= 0.75; // 肥胖對亞洲人骨折風險保護作用較明顯
    }
    
    // 台灣研究的風險因子相對風險比
    if (fracture) riskMultiplier *= 1.92; // 台灣研究顯示既往骨折RR=1.92
    if (parentHip) riskMultiplier *= 1.68; // 家族史在亞洲人群中相對風險比
    if (smoking) riskMultiplier *= 1.31; // 台灣吸菸者骨折風險
    if (steroid) riskMultiplier *= 2.15; // 糖皮質類固醇在亞洲人群的影響
    if (ra) riskMultiplier *= 1.48; // 台灣類風濕性關節炎患者風險
    if (secondary) riskMultiplier *= 1.58; // 繼發性骨質疏鬆症
    if (alcohol) riskMultiplier *= 1.28; // 亞洲人酒精代謝差異的影響
    
    // BMD調整（台灣DEXA標準）
    if (bmd !== null) {
        // 使用台灣年輕成人參考值調整的T-score影響
        if (bmd <= -3.0) {
            riskMultiplier *= 3.2;
        } else if (bmd <= -2.5) {
            riskMultiplier *= 2.8;
        } else if (bmd <= -2.0) {
            riskMultiplier *= 2.2;
        } else if (bmd <= -1.5) {
            riskMultiplier *= 1.8;
        } else if (bmd <= -1.0) {
            riskMultiplier *= 1.4;
        } else if (bmd <= -0.5) {
            riskMultiplier *= 1.2;
        } else {
            riskMultiplier *= 1.0;
        }
    }
    
    // 計算主要骨質疏鬆性骨折風險
    let majorFractureRisk = baseRisk * riskMultiplier;
    majorFractureRisk = Math.min(Math.max(majorFractureRisk, 0.3), 75);
    
    // 台灣髖骨骨折風險計算（亞洲人髖骨骨折比例相對較低）
    let hipFractureRisk = majorFractureRisk * 0.25; // 亞洲人髖骨骨折佔主要骨折的比例較低
    
    // 台灣特異性髖骨骨折調整
    let hipMultiplier = 1.0;
    if (parentHip) hipMultiplier *= 1.8; // 家族髖骨骨折史對台灣人髖骨風險影響
    if (steroid) hipMultiplier *= 1.4; // 糖皮質類固醇對髖骨的特殊影響
    if (bmi < 18.5) hipMultiplier *= 1.3; // 低BMI對髖骨風險的影響
    if (age >= 75) hipMultiplier *= 1.2; // 高齡者髖骨骨折風險增加
    
    hipFractureRisk *= hipMultiplier;
    hipFractureRisk = Math.min(Math.max(hipFractureRisk, 0.05), 35);
    
    let riskLevel, riskClass, description, recommendations, interventionThreshold;
    
    // 台灣骨質疏鬆症學會和健保署的治療閾值
    // 考慮台灣人群特異性和健保給付標準
    if (age >= 70) {
        interventionThreshold = 12; // 70歲以上，考慮亞洲人基準風險較低
    } else if (age >= 65) {
        interventionThreshold = 15; // 65-69歲
    } else if (age >= 50) {
        interventionThreshold = 18; // 50-64歲
    } else {
        interventionThreshold = 22; // 50歲以下較高閾值
    }
    
    // 台灣髖骨骨折風險治療閾值（亞洲人群調整）
    const hipRiskThreshold = 2.5;
    
    if (majorFractureRisk < 10 && hipFractureRisk < 1.5) {
        riskLevel = '低風險';
        riskClass = 'frax-low';
        description = '您的10年骨折風險較低，屬於正常範圍，繼續維持健康生活方式';
        recommendations = [
            '維持均衡飲食，每日攝取1000mg鈣質',
            '保持規律運動，每週至少150分鐘中等強度運動',
            '適當日曬或補充維生素D 600-800IU/日',
            '戒菸限酒，維持健康體重',
            '預防跌倒，改善居家環境安全',
            '建議每3-5年進行一次骨密度檢查'
        ];
    } else if (majorFractureRisk < interventionThreshold && hipFractureRisk < hipRiskThreshold) {
        riskLevel = '中等風險';
        riskClass = 'frax-medium';
        description = '您的10年骨折風險屬於中等程度，建議加強預防措施並考慮醫療評估';
        recommendations = [
            '增加鈣質攝取至1200mg/日，選擇易吸收形式',
            '補充維生素D 800-1000IU/日，監測血中濃度',
            '加強承重運動和阻力訓練，改善肌肉量',
            '進行平衡訓練，如太極、瑜伽等',
            '諮詢醫師評估是否需要藥物預防治療',
            '建議每2年進行一次骨密度檢查',
            '評估並治療其他影響骨質的疾病'
        ];
    } else {
        riskLevel = '高風險';
        riskClass = 'frax-high';
        description = '您的10年骨折風險較高，符合藥物治療條件，強烈建議立即尋求專業醫療評估';
        recommendations = [
            '立即諮詢骨科、運動醫學科、內分泌科或老年醫學科醫師',
            '進行完整的骨質疏鬆症評估和實驗室檢查',
            '開始藥物治療（如雙磷酸鹽類、denosumab等）',
            '制定個人化且安全的運動計畫',
            '積極改善所有可控制的風險因子',
            '加強跌倒預防措施和居家安全改善',
            '建議每1-2年進行一次骨密度檢查監測療效',
            '定期追蹤血清骨代謝標記'
        ];
    }
    
    // 分析主要風險因子
    const riskFactors = [];
    if (fracture) riskFactors.push('既往骨折病史');
    if (parentHip) riskFactors.push('父母髖骨骨折史');
    if (smoking) riskFactors.push('目前吸菸');
    if (steroid) riskFactors.push('長期使用糖皮質類固醇');
    if (ra) riskFactors.push('類風濕性關節炎');
    if (secondary) riskFactors.push('繼發性骨質疏鬆症');
    if (alcohol) riskFactors.push('過量飲酒');
    if (bmi < 20) riskFactors.push('體重過輕');
    if (age >= 65) riskFactors.push('高齡');
    if (bmd && bmd < -2.5) riskFactors.push('骨密度過低');
    
    document.getElementById('frax-result').innerHTML = `
        <div class="questionnaire-result">
            <div class="frax-scores">
                <div class="score-display">
                    <span class="score-value">${majorFractureRisk.toFixed(1)}%</span>
                    <div class="score-label">10年主要骨質疏鬆性骨折風險</div>
                </div>
                <div class="score-display">
                    <span class="score-value">${hipFractureRisk.toFixed(1)}%</span>
                    <div class="score-label">10年髖骨骨折風險</div>
                </div>
            </div>

            <div class="risk-level ${riskClass}">
                ${riskLevel}
            </div>

            <p><strong>評估結果：</strong>${description}</p>

            ${riskFactors.length > 0 ? `
                <div class="risk-factors">
                    <h4>您的主要風險因子：</h4>
                    <ul>
                        ${riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="recommendations">
                <h4>建議措施</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="health-tip">
                <h4>骨質健康小提醒</h4>
                <div class="bone-tips">
                    <div class="tip-category">
                        <strong>飲食建議：</strong>
                        <ul>
                            <li>每日攝取1000-1200mg鈣質（乳製品、深綠色蔬菜）</li>
                            <li>維生素D 800-1000IU/日（魚類、蛋黃、適當日曬）</li>
                            <li>充足蛋白質攝取，維持肌肉量</li>
                            <li>限制咖啡因和鈉的攝取</li>
                        </ul>
                    </div>
                    <div class="tip-category">
                        <strong>運動建議：</strong>
                        <ul>
                            <li>承重運動：快走、慢跑、爬樓梯</li>
                            <li>阻力訓練：啞鈴、彈力帶訓練</li>
                            <li>平衡訓練：太極、瑜伽</li>
                            <li>避免高風險運動，預防跌倒</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="risk-interpretation">
                <h4>風險數值解釋</h4>
                <p><strong>主要骨質疏鬆性骨折</strong>包括：脊椎骨折、髖骨骨折、前臂骨折、肱骨骨折等臨床重要骨折。</p>
                <p><strong>髖骨骨折</strong>是最嚴重的骨質疏鬆性骨折，可能導致永久失能或死亡。</p>
                <p><strong>治療閾值</strong>：${age}歲的治療建議閾值為主要骨折風險${interventionThreshold}%或髖骨骨折風險${hipRiskThreshold}%。</p>
                ${majorFractureRisk >= interventionThreshold || hipFractureRisk >= hipRiskThreshold ? 
                    '<p class="treatment-indication"><strong>您的風險已達到藥物治療條件</strong>，建議與醫師討論治療選項。</p>' : 
                    '<p class="prevention-focus">目前以<strong>生活方式調整和預防措施</strong>為主要策略。</p>'
                }
            </div>

            <div class="medical-note">
                <h4>重要醫療提醒</h4>
                <p><strong>本工具限制</strong>：此為簡化版FRAX評估，實際WHO FRAX工具使用更複雜的統計模型和國家特異性數據。結果僅供初步參考。</p>
                <p><strong>建議檢查</strong>：DEXA骨密度檢查、血清25-OH維生素D、副甲狀腺素(PTH)、鹼性磷酶、骨代謝標記等。</p>
                <p><strong>專科諮詢</strong>：如風險評估為中高風險，或有既往骨折史，請諮詢骨科、運動醫學科、內分泌科或老年醫學科專科醫師制定個人化治療計畫。</p>
            </div>
        </div>
    `;
}