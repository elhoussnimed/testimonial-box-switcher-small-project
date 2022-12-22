const testimonialText = document.querySelector(".testimonial_text p");
const userImage = document.querySelector(".user img");
const userName = document.querySelector(".user .user_name");
const userJob = document.querySelector(".user .user_job");
const progressBar = document.querySelector(".progress");

let currentTestimonial = 0;
let progressWidth = 0;

function fetchData() {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      addDataToDom(data);
      setInterval(() => {
        dynamicBar(data);
      }, 100);
    });
}
fetchData();

function addDataToDom(data) {
  const { testimonial, user_picture, user_name, user_job } =
    data[currentTestimonial];
  testimonialText.innerHTML = testimonial;
  userImage.src = user_picture;
  userName.innerHTML = user_name;
  userJob.innerHTML = user_job;
}

function dynamicBar(data) {
  progressBar.style.cssText = `width: ${(progressWidth += 1)}%`;
  if (progressWidth >= 101) {
    progressWidth = 0;
    changeTestimonialsDynamic(data);
  }
}

function changeTestimonialsDynamic(data) {
  if (currentTestimonial >= data.length - 1) {
    currentTestimonial = 0;
  } else {
    currentTestimonial++;
  }
  addDataToDom(data);
}
