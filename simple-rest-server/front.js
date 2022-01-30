async function getPosts() {
  try {
    const res = await axios.get("/posts");
    const posts = res.data;
    const list = document.getElementById("list");
    list.innerText = "";
    Object.keys(posts).map((key) => {
      const postLi = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = posts[key].title;
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const title = prompt("제목을 입력하세요.");
        if (!title) return alert("이름을 반드시 입력하세요.");
        const discription = prompt("내용을 입력하세요.");
        if (!discription) return alert("내용을 반드시 입력하세요.");
        try {
          await axios.put(`/post/${key}`, { title, discription });
          getPosts();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete(`/post/${key}`);
          getPosts();
        } catch (err) {
          console.error(err);
        }
      });
      const check = document.createElement("button");
      check.textContent = "보기";
      check.addEventListener("click", async () => {
        try {
          const post = await axios.get(`/post/${key}`);
          const data = post.data;
          alert(`Title: ${data.title}\nDiscription: ${data.discription}`);
        } catch (err) {
          console.error(err);
        }
      });
      postLi.append(span, check, edit, remove);
      list.appendChild(postLi);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getPosts;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const discription = e.target.discription.value;

  if (!title) return alert("이름을 입력하세요.");
  try {
    await axios.post("/post", { title, discription });
    getPosts();
  } catch (err) {
    console.error(err);
  }
});
