// universal declarations
const navigation = document.getElementById("navbar__menu");
const modalBtn = document.getElementById("modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const sections = document.querySelectorAll('.section');

// created the objects to be used for each section obtion
const navigationData = [
  {
    label: "Section 1",
    href: "#section1",
  },
  {
    label: "Section 2",
    href: "#section2",
  },
  {
    label: "Section 3",
    href: "#section3",
  },
  {
    label: "Section 4",
    href: "#section4",
  },
];

/// creating the needed tags for the navbar items 

const navList = document.getElementById("navbar__list");
for (const item of navigationData) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  // linking the created tags to the objects above

  link.textContent = item.label;
  link.href = item.href;

  //using preventDefault to scroll the clicked section into view

  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetSection = document.getElementById(link.hash.substr(1));
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

  // added a modal box that pops up on clicking the navbar items for fun :)

  link.onclick = function () {
    modal.style.display = "block";
  };
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  // adding the fully created li into the ul
  listItem.append(link);
  navList.appendChild(listItem);
}

let sectionInViewport = function(section) {
  let distance = section.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <= (window.innerWidth || document.documentElement.clientWidth)   

  );
};

window.addEventListener('scroll', function() {
  sections.forEach(section => {
    if (sectionInViewport(section)) {
      const sectionHeight = section.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      const sectionInViewPercentage = (sectionHeight / viewportHeight) * 100;

      if (sectionInViewPercentage >= 50) {
        section.classList.add("your-active-class");
        const navItem = document.querySelector(`nav a[href="#${section.id}"]`);
        navItem.classList.add("active");
      }
    } else {
      section.classList.remove("your-active-class");
      const navItem = document.querySelector(`nav a[href="#${section.id}"]`);
        navItem.classList.remove("active");
    }
  });
}, );

