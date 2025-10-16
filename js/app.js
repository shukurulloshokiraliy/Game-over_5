document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.Container');
  const API = 'https://faq-crud.onrender.com/api/faqs';
  const API_Post ="https://faq-crud.onrender.com/api/faqs"
  let accords = [];
  let editId = null;
  
  async function getData() {
    try {
      const res = await fetch(API);
      const data = await res.json();
    //   apini malumotlarini tekshirib oldim ustoz
      accords = Array.isArray(data) ? data : data.data || [];
      render();
    } catch (e) {
    }
  }

  function render() {
    container.innerHTML = `
      <div class="Title" style="margin:100px 0 0 0;">
        <img src="./images/logo.png" alt="">
        <button id="add-btn" class="btn sub-btn">Add New</button>
      </div>
      <form id="form" class="form" style="display:none;">
        <label>Question:</label>
        <input id="q" type="text" class="input-q" required>
        <label>Answer:</label>
        <input id="a" type="text" class="input-a" required>
        <button id="save-btn" class="btn btn-create">Create</button>
      </form>
    `;

    accords.forEach(x => {
      const acc = document.createElement('div');
      acc.className = 'accord';
      acc.innerHTML = `
        <button class="Question">
          ${x.question || 'No title'}
          <img class="up-img" src="./images/opened.svg" style="width:20px; height:20px;">
        </button>
        <div class="Answer" style="display:none;">
          ${x.answer || 'No content'} <br>
          <button class="edit-btn">Edit</button>
          <button class="del-btn">Delete</button>
        </div>
      `;
      container.appendChild(acc);
    //   acc bu accord sozini qisqartmasi

    const qBtn = acc.querySelector('.Question');
      const ans = acc.querySelector('.Answer');
      const img = acc.querySelector('.up-img');

      qBtn.onclick = () => {
        const open = acc.classList.contains('open');
        document.querySelectorAll('.accord').forEach(a => {
          a.classList.remove('open');
          a.querySelector('.Answer').style.display = 'none';
          a.querySelector('.up-img').src = './images/opened.svg';
        });
        if (!open) {
          acc.classList.add('open');
          ans.style.display = 'block';
          img.src = './images/closed.svg';
        }
      };

      acc.querySelector('.del-btn').onclick = () => delAcc(x.id);
      acc.querySelector('.edit-btn').onclick = () => editAcc(x.id);
    });

    setEvents();
  }

  function setEvents() {
    const form = document.getElementById('form');
    const addBtn = document.getElementById('add-btn');
    const saveBtn = document.getElementById('save-btn');

    addBtn.onclick = () => {
      console.log("men setman");
      
      editId = null;
      saveBtn.textContent = 'Create';
      form.reset();
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    };

    form.onsubmit = async e => {
      e.preventDefault();
      const q = document.getElementById('q').value.trim();
      const a = document.getElementById('a').value.trim();
      if (!q || !a) return;
      if (editId) await updateAcc(editId, q, a);
      else await createAcc(q, a);
      form.style.display = 'none';
      form.reset();
      editId = null;
      getData();
    };
  }
//   q = question
// a = answer
  // ======== CREATE btn ========
  async function createAccord(q, a) {
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: API.question, content: API.answer })
        });
       
    } catch (err) {
        console.error('Yaratish xatosi amndamas 500:', err);
    }
}
createAccord()
  getData();
});
