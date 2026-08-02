const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.onclick = function () {
        window.location.href = "profile.html";
    };
}

// =============================
// Save Profile
// =============================
function saveProfile() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);

    window.location.href = "dashboard.html";
}

// =============================
// Load Water
// =============================
function loadWater() {

    let water = parseInt(localStorage.getItem("water")) || 0;

    let waterCount = document.getElementById("waterCount");
    if (waterCount)
        waterCount.innerHTML = water;

    let progress = document.getElementById("waterProgress");
    if (progress)
        progress.value = water;
}

// =============================
// Add Water
// =============================
function addWater() {

    let water = parseInt(localStorage.getItem("water")) || 0;

    if (water < 8)
        water++;

    localStorage.setItem("water", water);

    loadWater();
}

// =============================
// Remove Water
// =============================
function removeWater() {

    let water = parseInt(localStorage.getItem("water")) || 0;

    if (water > 0)
        water--;

    localStorage.setItem("water", water);

    loadWater();
}

// =============================
// Load Profile Details
// =============================
function loadProfileDetails() {

    let age = document.getElementById("ageValue");
    let height = document.getElementById("heightValue");
    let weight = document.getElementById("weightValue");

    if (age)
        age.innerHTML = localStorage.getItem("age") + " Years";

    if (height)
        height.innerHTML = localStorage.getItem("height") + " cm";

    if (weight)
        weight.innerHTML = localStorage.getItem("weight") + " kg";
}

// =============================
// Refresh Dashboard
// =============================
function refreshDashboard() {

    loadWater();
    loadProfileDetails();
}

// =============================
// Dashboard Auto Load
// =============================
window.onload = function () {

    const user = document.getElementById("userName");

    if (user) {

        let name = localStorage.getItem("name") || "";
        let height = parseFloat(localStorage.getItem("height")) || 0;
        let weight = parseFloat(localStorage.getItem("weight")) || 0;

        user.innerHTML = "👋 Hello, " + name;

        let bmiValue = document.getElementById("bmiValue");
        let bmiStatus = document.getElementById("bmiStatus");

        if (height > 0 && weight > 0) {

            let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

            if (bmiValue)
                bmiValue.innerHTML = bmi;

            let status = "Healthy";

            if (bmi < 18.5)
                status = "Underweight";
            else if (bmi >= 25 && bmi < 30)
                status = "Overweight";
            else if (bmi >= 30)
                status = "Obese";

            if (bmiStatus)
                bmiStatus.innerHTML = status;
        }
    }

    refreshDashboard();

    if (document.getElementById("workoutList")) {
        displayWorkouts();
    }
};
// =============================
// Workout Tracker
// =============================

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function addWorkout() {

    let workoutType = document.getElementById("workoutType");
    let customWorkout = document.getElementById("customWorkout");
    let durationInput = document.getElementById("duration");
    let caloriesInput = document.getElementById("burnedCalories");

    if (!workoutType || !durationInput || !caloriesInput)
        return;

    let type = workoutType.value;
    let custom = customWorkout ? customWorkout.value.trim() : "";
    let duration = durationInput.value;
    let calories = caloriesInput.value;

    if (type === "Custom") {

        if (custom === "") {
            alert("Enter custom workout name");
            return;
        }

        type = custom;
    }

    if (duration === "" || calories === "") {
        alert("Enter duration and calories");
        return;
    }

    workouts.push({
        type: type,
        duration: Number(duration),
        calories: Number(calories)
    });

    localStorage.setItem("workouts", JSON.stringify(workouts));

    if (customWorkout) customWorkout.value = "";
    durationInput.value = "";
    caloriesInput.value = "";

    displayWorkouts();
}

function displayWorkouts() {

    let list = document.getElementById("workoutList");

    if (!list)
        return;

    list.innerHTML = "";

    let totalDuration = 0;
    let totalCalories = 0;

    workouts.forEach(function (workout, index) {

        totalDuration += workout.duration;
        totalCalories += workout.calories;

        list.innerHTML += `
        <li>
            <b>${workout.type}</b><br>
            Duration: ${workout.duration} min<br>
            Calories: ${workout.calories} kcal<br><br>

            <button onclick="deleteWorkout(${index})">
                Delete
            </button>
        </li>
        <hr>
        `;
    });

    let durationText = document.getElementById("totalDuration");
    let caloriesText = document.getElementById("totalBurned");

    if (durationText)
        durationText.innerHTML = totalDuration;

    if (caloriesText)
        caloriesText.innerHTML = totalCalories;

    localStorage.setItem("totalBurned", totalCalories);
}

function deleteWorkout(index) {

    workouts.splice(index, 1);

    localStorage.setItem("workouts", JSON.stringify(workouts));

    displayWorkouts();
}

function clearWorkouts() {

    if (confirm("Delete all workouts?")) {

        workouts = [];

        localStorage.removeItem("workouts");
        localStorage.removeItem("totalBurned");

        displayWorkouts();
    }
}

// Load workouts automatically
if (document.getElementById("workoutList")) {
    displayWorkouts();
}

// =============================
// Diet Tracker
// =============================

let meals = JSON.parse(localStorage.getItem("meals")) || [];

function addMeal(){

let type=document.getElementById("mealType").value;
let food=document.getElementById("foodName").value;
let calories=document.getElementById("foodCalories").value;

if(food=="" || calories==""){
alert("Enter food name and calories");
return;
}

meals.push({
type:type,
food:food,
calories:Number(calories)
});

localStorage.setItem("meals",JSON.stringify(meals));

document.getElementById("foodName").value="";
document.getElementById("foodCalories").value="";

displayMeals();

}

function displayMeals(){

let list=document.getElementById("mealList");

if(!list) return;

list.innerHTML="";

let total=0;

meals.forEach(function(meal,index){

total+=meal.calories;

list.innerHTML+=`
<li>
<b>${meal.type}</b><br>
${meal.food}<br>
${meal.calories} kcal
<br>
<button onclick="deleteMeal(${index})">Delete</button>
</li><hr>
`;

});

let totalCalories=document.getElementById("totalCalories");

if(totalCalories)
totalCalories.innerHTML=total;

}

function deleteMeal(index){

meals.splice(index,1);

localStorage.setItem("meals",JSON.stringify(meals));

displayMeals();

}

function clearMeals(){

if(confirm("Delete all meals?")){

meals=[];

localStorage.removeItem("meals");

displayMeals();

}

}

if(document.getElementById("mealList")){
displayMeals();
}
// =============================
// Weight Tracker
// =============================

let weights = JSON.parse(localStorage.getItem("weights")) || [];

function addWeight() {

    let input = document.getElementById("weightInput");

    if (!input) return;

    let weight = parseFloat(input.value);

    if (isNaN(weight) || weight <= 0) {
        alert("Enter a valid weight.");
        return;
    }

    weights.push(weight);

    localStorage.setItem("weights", JSON.stringify(weights));

    input.value = "";

    displayWeights();
}

function displayWeights() {

    let list = document.getElementById("weightList");

    if (!list) return;

    list.innerHTML = "";

    if (weights.length === 0) {

        document.getElementById("currentWeight").innerHTML = "0";
        document.getElementById("startWeight").innerHTML = "0";
        document.getElementById("weightChange").innerHTML = "0";

        return;
    }

    weights.forEach(function(weight, index) {
        list.innerHTML += `<li>Day ${index + 1}: ${weight} kg</li>`;
    });

    let current = weights[weights.length - 1];
    let start = weights[0];
    let change = (current - start).toFixed(1);

    document.getElementById("currentWeight").innerHTML = current;
    document.getElementById("startWeight").innerHTML = start;
    document.getElementById("weightChange").innerHTML = change;
}

function clearWeights() {

    if (confirm("Delete all weight records?")) {

        weights = [];

        localStorage.removeItem("weights");

        displayWeights();
    }
}

if (document.getElementById("weightList")) {
    displayWeights();
}

// =============================
// Progress Page
// =============================
function loadProgress() {

    let name = localStorage.getItem("name") || "";
    let height = parseFloat(localStorage.getItem("height")) || 0;
    let weight = parseFloat(localStorage.getItem("weight")) || 0;

    let water = localStorage.getItem("water") || 0;

    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    let totalCalories = 0;
    meals.forEach(function(meal){
        totalCalories += meal.calories;
    });

    let totalWorkout = workouts.length;

    if(document.getElementById("progressName"))
        document.getElementById("progressName").innerHTML = name;

    if(document.getElementById("progressWater"))
        document.getElementById("progressWater").innerHTML = water;

    if(document.getElementById("progressCalories"))
        document.getElementById("progressCalories").innerHTML = totalCalories;

    if(document.getElementById("progressWorkout"))
        document.getElementById("progressWorkout").innerHTML = totalWorkout;

    if(document.getElementById("progressWeight"))
        document.getElementById("progressWeight").innerHTML = weight;

    if(height > 0 && weight > 0){

        let bmi = (weight / ((height/100)*(height/100))).toFixed(1);

        document.getElementById("progressBMI").innerHTML = bmi;

        let status = "Healthy";

        if(bmi < 18.5)
            status = "Underweight";
        else if(bmi >= 25 && bmi < 30)
            status = "Overweight";
        else if(bmi >= 30)
            status = "Obese";

        document.getElementById("progressBMIStatus").innerHTML = status;
    }
}

if(document.getElementById("progressName")){
    loadProgress();
      }
