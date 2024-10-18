const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};
const displayCategories = (data) => {
  const categoryContainer = document.getElementById("pet-categories");
  data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class='btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full'>
    <img class="w-10" src="${category.category_icon}" alt="" />
    <p class="text-xl font-bold">${category.category}</p>
    </button>
    
    `;
    categoryContainer.appendChild(div);
  });
};

// load pets by category name

const loadPetsByCategory = async (category) => {
  // remove active buttons if exist
  removeActiveClasses();
  // show active buttons
  addActiveClasses(category);
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();

  setTimeout(() => {
    displayAllPets(data.data);
    loadingSpinner(false);
  }, 2000);
};

// load all pets

const loadAllPets = async () => {
  loadingSpinner(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  setTimeout(() => {
    displayAllPets(data.pets);
    loadingSpinner(false);
  }, 2000);
};
const displayAllPets = (data) => {
  const petContainers = document.getElementById("all-pets");
  //   petContainers.innerHTML = "";
  data.forEach((pet) => {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "p-4",
      "border",
      "rounded-xl",
      "font-bold"
    );
    div.innerHTML = `
    <img class='h-36 w-full rounded-xl object-cover' src="${
      pet.image
    }" alt="" />
    <h3 class='text-xl '>${pet.pet_name}</h3>
    <p class='text-sm text-gray-500'>Breed : ${pet.breed || "No Breed"} </p>
    <p class='text-sm text-gray-500'>Date of Birth : ${
      pet.date_of_birth ? pet.date_of_birth : "Not Available"
    } </p>
    <p class='text-sm text-gray-500'>Gender : ${pet.gender || "No Name"} </p>
    <p class='text-sm text-gray-500'>Price :  ${
      pet.price ? "$" + pet.price : "Not Available"
    } </p>
    <hr class='my-2' />
    <div class='flex justify-between items-center'>
    <button class='btn bg-white text-teal-700 border rounded-lg py-1 px-4'><i class="fa-regular fa-thumbs-up"></i></button>
    <button class='btn bg-white text-teal-700 border rounded-lg py-1 px-4'>Addopt</button>
    <button class='btn bg-white text-teal-700 border rounded-lg py-1 px-4'>Details</button>
    </div>

    `;
    petContainers.appendChild(div);
  });
};

loadAllPets();
loadCategories();
