const form = document.getElementById("investment-form");  
const investmentAmountInput = document.getElementById("investment-amount");  
const interestRateInput = document.getElementById("interest-rate");  
const investmentTimingInput = document.getElementById("investment-timing");  
const calculateBtn = document.getElementById("calculate-btn");  
const resultMessage = document.getElementById("result-message");  
const investmentGraph = document.getElementById("investment-graph");  
  
 
function calculateInvestmentResult() {  
   const investmentAmount = parseFloat(investmentAmountInput.value);  
   const interestRate = parseFloat(interestRateInput.value);  
   const investmentTiming = parseFloat(investmentTimingInput.value);  
   const result = investmentAmount * (1 + interestRate / 100) ** investmentTiming;  
   return result;  
}  
  
 
function drawInvestmentGraph(result) {  
   const ctx = investmentGraph.getContext("2d");  
   ctx.clearRect(0, 0, investmentGraph.width, investmentGraph.height);  
   ctx.beginPath();  
   ctx.moveTo(0, investmentGraph.height);  
   ctx.lineTo(investmentGraph.width, investmentGraph.height - result);  
   ctx.stroke();  
}  
  

calculateBtn.addEventListener("click", (e) => {  
   e.preventDefault();  
   const result = calculateInvestmentResult();  
   resultMessage.textContent = `Your investment will be worth $${result.toFixed(2)} after ${investmentTimingInput.value} years.`;  
   drawInvestmentGraph(result);  
});