
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const dateInput = document.getElementById('dateinput');
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const errorText = document.getElementById('error');

    calculateBtn.addEventListener('click', () => {
        const birthdate = new Date(dateInput.value);
        const currentDate = new Date();

        if (!isValidDate(birthdate) || dateInput.value.trim() === '') {
            showError('Please select a valid date.');
            return;
        }

        if (birthdate.getTime() > currentDate.getTime()) {
            showError('Birthdate cannot be in the future.');
            return;
        }

        const age = calculateAge(birthdate, currentDate);
        displayAge(age);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearInputs();
        });
    }

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    function calculateAge(birthdate, currentDate) {
        let age = {};

        let yearDiff = currentDate.getFullYear() - birthdate.getFullYear();
        let monthDiff = currentDate.getMonth() - birthdate.getMonth();
        let dayDiff = currentDate.getDate() - birthdate.getDate();

        // Adjust for negative month or day difference
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            yearDiff--;
            monthDiff += (monthDiff < 0) ? 12 : 0;

            // Adjust days for negative day difference
            if (dayDiff < 0) {
                const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
                dayDiff = prevMonthDays + dayDiff;
                monthDiff--;
            }

        }

        age.years = yearDiff;
        age.months = monthDiff;
        age.days = dayDiff;

        return age;
    }

    function displayAge(age) {
        yearsSpan.textContent = age.years;
        monthsSpan.textContent = age.months;
        daysSpan.textContent = age.days;
    }

    function showError(message) {
        errorText.textContent = message;
        clearInputs();
        errorText.style.display = 'block';
        setTimeout(() => {
            errorText.style.display = 'none';
        }, 2000);
        return;
    }

    function clearInputs() {
        dateInput.value = '';
        yearsSpan.textContent = '';
        monthsSpan.textContent = '';
        daysSpan.textContent = '';
    }
});
