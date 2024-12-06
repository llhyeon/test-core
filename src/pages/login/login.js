import "@/pages/login/login.css";
import pb from "@/api/pocketbase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function createTag() {
  return `
  <div class="container">
      <h1>로그인</h1>
      <hr />
      <form>
        <div>
          <label for="idField"></label>
          <input type="email" id="idField" placeholder="아이디(이메일)" />
        </div>
        <div>
          <label for="pwField"></label>
          <input type="password" id="pwField" placeholder="비밀번호" />
        </div>
        <button type="submit" class="login">LOGIN</button>
      </form>

      <a class="register" href="/src/pages/register">간편 회원가입</a>
    </div>
  `;
}

function renderLogin() {
  document.body.insertAdjacentHTML("beforeend", createTag());
}

async function handleLogin(e) {
  e.preventDefault();

  try {
    const id = "0617mosses@gmail.com";
    const pw = "dkssud123!@";

    // const id = document.querySelector("#idField").value;
    // const pw = document.querySelector("#pwField").value;

    await pb.collection("users").authWithPassword(id, pw);

    const auth = JSON.parse(localStorage.getItem("pocketbase_auth"));

    const { record, token } = auth;
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuth: !!record,
        user: record,
        token: token,
      })
    );
    Swal.fire({
      title: "로그인 성공",
      text: "메인 페이지로 이동합니다.",
      icon: "success",
      confirmButtonText: "닫기",
    }).then(() => {
      setTimeout(() => {
        location.href = "/index.html";
      }, 300);
    });
  } catch (err) {
    Swal.fire({
      title: "로그인 실패",
      text: "아이디와 패스워드를 다시 확인해주세요",
      icon: "error",
      confirmButtonText: "닫기",
    });
  }
}

renderLogin();

const loginButton = document.querySelector(".login");

loginButton.addEventListener("click", handleLogin);
