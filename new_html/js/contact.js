(function () {
    const base = window.AnupamShared ? window.AnupamShared.base() : '';
    const toast = (msg) => window.AnupamUI && window.AnupamUI.toast(msg);

    const stores = {
        '1': {
            name: 'Anupam Stores 1',
            address: '68 Suraj Nagar West, opposite metro pillar no. 61 Civil Lines, Sodala, Jaipur, Rajasthan 302006',
            query: 'Anupam Stores, 68 Suraj Nagar West, Civil Lines, Sodala, Jaipur, Rajasthan 302006',
            image: 'assets/images/store-1.png',
            alt: 'Anupam Stores 1 showroom at Sodala, Jaipur'
        },
        '2': {
            name: 'Anupam Stores 2',
            address: 'Plot No. 18, 19, 20, Ashok Nagar, Purani Chungi, near Ridhiraj World Business Center, Ajmer Road, Jaipur, Rajasthan 302019',
            query: 'Anupam Stores, Ashok Nagar, Purani Chungi, Ajmer Road, Jaipur, Rajasthan 302019',
            image: 'assets/images/store-2.png',
            alt: 'Anupam Stores 2 showroom on Ajmer Road, Jaipur'
        }
    };

    const chips = Array.from(document.querySelectorAll('[data-store]'));
    const map = document.querySelector('[data-store-map]');
    const nameEl = document.querySelector('[data-store-name]');
    const addressEl = document.querySelector('[data-store-address]');
    const imageEl = document.querySelector('[data-store-image]');

    function showStore(id) {
        const store = stores[id];
        if (!store) return;

        chips.forEach((chip) => {
            const active = chip.dataset.store === id;
            chip.classList.toggle('is-active', active);
            chip.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        if (map) {
            map.src = 'https://www.google.com/maps?q=' + encodeURIComponent(store.query) + '&output=embed';
            map.title = 'Map showing ' + store.name;
        }
        if (nameEl) nameEl.textContent = store.name;
        if (addressEl) addressEl.textContent = store.address;
        if (imageEl) {
            imageEl.src = base + store.image;
            imageEl.alt = store.alt;
        }
    }

    chips.forEach((chip) => {
        chip.addEventListener('click', () => showStore(chip.dataset.store));
    });

    const form = document.querySelector('[data-contact-form]');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const required = Array.from(form.querySelectorAll('[required]'));
        const invalid = required.filter((field) => !field.checkValidity());

        required.forEach((field) => {
            field.setAttribute('aria-invalid', field.checkValidity() ? 'false' : 'true');
        });

        if (invalid.length) {
            invalid[0].focus();
            toast('Please add your name and a valid email address');
            return;
        }

        toast('Thanks for writing to us — our team will reply soon');
        form.reset();
        required.forEach((field) => field.setAttribute('aria-invalid', 'false'));
    });
})();
