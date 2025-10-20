
        const form = document.getElementById('ageForm');
        const resultElement = document.getElementById('result');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const birthInput = document.getElementById('birth');
            const birthDate = new Date(birthInput.value);
            const today = new Date();
            
            if (!birthInput.value) {
                resultElement.textContent = 'Please enter a valid birth date!';
                resultElement.classList.add('show');
                return;
            }
            
            if (birthDate > today) {
                console.log(birthDate)
                resultElement.textContent = 'Birth date cannot be in the future!';
                resultElement.classList.add('show');
                return;
            }

            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (days < 0) {
                months--;
                const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += prevMonth.getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }
            
            resultElement.classList.add('show');
            resultElement.innerHTML = `
                <div>
                    <div style="font-size: 20px; margin-bottom: 15px;">You are</div>
                    <div class="age-details">
                        <div class="age-item">
                            <span class="age-number">${years}</span>
                            <span class="age-label">Years</span>
                        </div>
                        <div class="age-item">
                            <span class="age-number">${months}</span>
                            <span class="age-label">Months</span>
                        </div>
                        <div class="age-item">
                            <span class="age-number">${days}</span>
                            <span class="age-label">Days</span>
                        </div>
                    </div>
                </div>
            `;
            console.log(resultElement.innerHTML)
        });
