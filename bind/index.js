const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const cars = ["BMW"];
    const root = $("#list");
    const input = $("#textInput");
    const submitBtn = $("#submit");

    return {
        add(car) {
            cars.push(car);
        },
        delete(index) {
            cars.splice(index, 1);
        },
        render() {
            const html = cars.map((car, index) => `
                <li>
                    ${car}
                    <span class="delete" data-index="${index}">&times</span>
                </li>
            `).join("");
            root.innerHTML = html;
        },
        handleDelete(e) {
            const deleteBtn = e.target.closest('.delete');
            if (deleteBtn) {
                const index = deleteBtn.dataset.index;
                this.delete(index);
                this.render();
            }
        },  
        init() {
            submitBtn.onclick = () => {
                const car = input.value;
                // this = app
                this.add(car);
                this.render();

                input.value = null;
                input.focus();
            };
            // this = app
            root.onclick = this.handleDelete.bind(this);
            this.render();
        },
    };
})();

app.init();
