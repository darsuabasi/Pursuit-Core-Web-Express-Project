document.addEventListener("DOMContentLoaded", () => {
    // console.log("hello world")
let select = document.querySelector("#populateClasses");
  const populateClasses = async () => {
      try {
          let res = await axios.get("http://localhost:3000/class/");
    
          let displayClasses = res.data.class;
          return displayClasses.forEach((showClass) => {
            const name = Object.keys(showClass)[0]
            console.log(name)
            let option = document.createElement("option");
            option.innerText = name; 
            //   option.value = showClass.students;
            select.appendChild(option)
        })
    } catch(err) {
        console.log(err);
    }
}

// const getAllStudentsInClass = async () => {
//     try {
//         let res = await axios(`http://localhost:3000/class/${className}`);


//         let students = res.data.allStudents[name];

//         let ul = document.querySelector("ul");
//         if (ul) {
//             ul.parentNode.removeChild(ul)
//         }
//         ul = document.createElement("ul");
//         let li = document.createElement("li");
//         li.innerText = students
//         ul.appendChild(li) 
//     } catch (error) {
//         console.log(error)
//     }
//   }

populateClasses()
select.addEventListener("change", (event) => {
    getAllStudentsInClass(event.target.value)
})


// let select2 = document.querySelector("populateStudents");
//     const populateStudents = async () => {
//         try {
//             let res = await axios.get("");
//             let displayStudents = res.data.results;
//             displayStudents.forEach(student => {
//                 let option = document.createElement("option");
//                 option.innerText = `${student.name} ${student.age} ${student.city} ${student.grade} ${student.house}`
//                 select.appendChild(option)
//             })
//         } catch(err) {
//             console.log(err);
//         }
//     }

let mainDiv = document.querySelector("#mainDiv")
// let populateClasses = document.querySelector("#populateClasses")
// let populateStudents = document.querySelector("#populateStudents")
let addClassDivHead = document.querySelector("#addClassDivHead")
let addClassDivMain = document.querySelector("#addClassDivMain")
let className = document.querySelector("#className")
let teacherName = document.querySelector("#teacherName")
let addClassBtn = document.querySelector("#addClassBtn")
let newClassDisplay = document.querySelector("#newClassDisplay")
let newClassDisplayUL = document.querySelector("#newClassDisplayUL")
let enrollStudentDiv = document.querySelector("#enrollStudentDiv")
let addClassForm = document.querySelector("#addClassForm")
let enrollStudentForm = document.querySelector("#enrollStudentForm")
let sClassName = document.querySelector("#sClassName")
let studentName = document.querySelector("#studentName")
let studentAge = document.querySelector("#studentAge")
let studentCity = document.querySelector("#studentCity")
let studentGrade = document.querySelector("#studentGrade")
let studenetEnrollBtn = document.querySelector("#studenetEnrollBtn")
let newStudentDisplay = document.querySelector("#newStudentDisplay")
let newStudentDisplayUL = document.querySelector("#newStudentDisplayUL")
let failingForm = document.querySelector("#failingForm")
let enterClass = document.querySelector("#enterClass")
let addCity = document.querySelector("#addCity")
let displayFailing = document.querySelector("#displayFailing")
let fsBtn = document.querySelector("#fsBtn")
let failingStudentList = document.querySelector("#failingStudentList")
let failingStudentListUL = document.querySelector("#failingStudentListUL")
// let res = url





addClassForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let className = document.querySelector("#className").value
    let teacherName = document.querySelector("#teacherName").value
try {
    newClassDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/add`, {name: className, teacher: teacherName})
    let h3 = document.createElement("h3");
    h3.innerText = res.data.message
    newClassDisplay.appendChild(h3)
} catch (error) {
    console.log(error)

} 
  })

  enrollStudentForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let sClassName = document.querySelector("#sClassName").value
    let name = document.querySelector("#studentName").value
    let age = document.querySelector("#studentAge").value
    let city = document.querySelector("#studentCity").value
    let grade = document.querySelector("#studentGrade").value
    let house = document.querySelector("#studentHouse").value
try {
    newStudentDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/${sClassName}/enrollStudent`,{class: sClassName, name: name, age: age, grade: grade, city: city, house: house})
    let h3 = document.createElement("h3")
    h3.innerText = res.data.message
    newStudentDisplay.appendChild(h3)
} catch (error){
    console.log(error)
}
  })

    
 
  
    // let failingForm = document.querySelector("#failingForm");
    // let addCity = document.querySelector("#addCity");
    // let displayFailing = document.querySelector("#displayFailing");
    failingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      addClassFormm.innerHTML = "";
      enrollStudentFormm.innerHTML = "";
      failingFormm.innerHTML = "";

      let res = await axios.get(`http://localhost:3000/class/${className}/students`);
      failingStudentListUL.innerText = "";
        if(city != "" && failing === true){
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < list.data.length; i ++){
                if(res.data[i]["city"] === city && res.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else if(city != "" && failing === false){
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message;
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < res.data.length; i ++){
                if(res.data[i]["city"] === city){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else if(city === "" && failing === true){
            let h3 = document.createElement("h3");
            failingStudentListUL.appendChild(h3);
            h3.innerText = res.data.message;
            for(let i = 0; i < res.data.length; i ++){
                if(res.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else {
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message;
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < res.data.length; i ++){
                let li = document.createElement("li");
                li.innerText= res.data.message;
                failingStudentListUL.appendChild(li);
            };
        };
      
    });

});