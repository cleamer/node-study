async function getUsers() {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    console.log(users); // test
    const list = document.getElementById("list");
    list.innerText = "";
    Object.keys(users).map((key) => {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const name = prompt("이름을 입력하세요.");
        if (!name) return alert("이름을 반드시 입력하세요.");
        try {
          await axios.put(`/user/${key}`, { name });
          getUsers();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete(`/user/${key}`);
          getUsers();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.append(span, edit, remove);
      list.appendChild(userDiv);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUsers;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) return alert("이름을 입력하세요.");
  try {
    await axios.post("/user", { name });
    getUsers();
  } catch (err) {
    console.error(err);
  }
});
