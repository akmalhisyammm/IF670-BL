const calculateBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const resultSection = document.getElementById('result');

const calculateBMI = () => {
  const enteredHeight = +heightInput.value / 100; // tinggi dalam meter
  const enteredWeight = +weightInput.value; // berat dalam kg

  const bmi = enteredWeight / (enteredHeight * enteredHeight);

  let bmiDesc;

  if (bmi < 8.5) {
    bmiDesc = 'Kurus'; 
  } else if (bmi >= 8.5 && bmi < 25) {
    bmiDesc = 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    bmiDesc = 'Gemuk';
  } else {
    bmiDesc = 'Obesitas';
  }

  resultSection.innerHTML = `
    <ion-col>
      <ion-card class="ion-padding-vertical">
        <ion-text>
          <p>${bmi}</p>
        </ion-text>
        <ion-text>
          <h3>${bmiDesc}</h3>
        </ion-text>
      </ion-card>
    </ion-col>
  `;

  console.log(bmi);
};

const resetBMI = () => {
  heightInput.value = '';
  weightInput.value = '';
  resultSection.innerHTML = '';
}

calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetBMI);