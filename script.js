const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const list = document.getElementById("list");

function addList(a, b, c, d) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<th>${a}</th>
                <td>${b}</td>
                <td>${c}</td>
                <td><button value="${d}">Edit</button></td>
                <td><button value="${d}">XXX</button></td>`;

  return tr;
}


function editFun(a, b, c, d) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td><input required type="text" value="${a}"/></td>
                    <td><input required type="email" value="${b}"/></td>
                    <td><input required type="tel" value="${c}"></td> 
                    <td><button  value="${d}">Save</button></td>
                    <td><button value="${d}">XXX</button></td>`;
  return tr;
}
/// axios in Action-------------
const url = "https://crudcrud.com/api/ad5d819ce17a44a0aa8c06e51e1751cd/list";
axios
  .get(url)
  .then((res) => {
    const user = res.data;
    for (let i = 0; user.length; i++) {
      const row = addList(
        user[i].name,
        user[i].email,
        user[i].phone,
        user[i]._id
      );
      list.appendChild(row);
    }
  })
  .catch((err) => console.error());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const data = { name: name.value, email: email.value, phone: phone.value };
  axios.post(url, data).then((res) => {
    location.reload();
    window.onload = function () {
      location.reload(true);
    };
  });
  form.reset();
});

///-----button in action ------------
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const btn = e.target;
    const tr = btn.parentNode.parentNode;
    // console.log(tr);

    if (btn.textContent === "XXX") {
      list.removeChild(tr);
      axios.delete(`${url}/${btn.value}`).then((res) => {
        // location.reload();

        console.log("Delete success!!!");
      });
      // console.log(btn.value);
    } else if (btn.textContent === "Edit") {
      const data = tr.children;
      const a = data[0].textContent;
      const b = data[1].textContent;
      const c = data[2].textContent;
      const d = btn.value;
      const row = editFun(a, b, c, d);

      list.insertBefore(row, tr);
      list.removeChild(tr);
      // console.log(a, b, c);
    } else if (btn.textContent === "Save") {
      const data = tr.children;
      const a = data[0].firstElementChild.value;
      const b = data[1].firstElementChild.value;
      const c = data[2].firstElementChild.value;
      const d = btn.value;
     

      if (a === "" || b === "" || c === "") {
        alert("This field is required ");
      } else {
        // console.log(a,b,c,d);
        const row = addList(a, b, c, d);
        list.insertBefore(row, tr);
        list.removeChild(tr);
        const userData = { name: a, email: b, phone: c };

        axios.put(`${url}/${d}`, userData).then(() => {
          console.log("updated !!!");
        });
      
      }
    }
  }
});
