import "./style.css";

const rootClassName = "EmailsInput";

const EmailsInput = (node: HTMLElement) => {
  // Using innerHTML to save time. Even though it ins't safe or fast.
  node.innerHTML = `
    <div>
        <span>Share <b>Board Name</b> with others</span>
        <ul>
            <li>machadoum@gmail.com</li>
            <input>
        </ul>
    </div>
    <div>
        <button>
            Add email
        </button>
        <button>
            Get emails count
        </button>
    </div>
  `;

  node.classList.add("EmailsInput");
};
export default EmailsInput;
