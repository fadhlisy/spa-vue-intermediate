export default {
    namespaced: true,
    state() {
        return {
            tampil: false,
            nama: null,
            label: null,
            pesan: null
        }
    },
    mutations: {
        setNotifikasi(state, { tampil, nama, label, pesan }) {
            state.tampil = tampil;
            state.nama = nama;
            state.label = label;
            state.pesan = pesan;
        },
        resetNotifikasi(state) {
            state.tampil = false;
            state.nama = null;
            state.label = null;
            state.pesan = null;
        },
        proses(state) {
            state.tampil = true;
            state.nama = 'process';
            state.label = 'Sedang memproses...';
            state.pesan = 'Mohon tunggu sebentar';
        }
    },
    actions: {
        tampilkan({ commit }, { tampil, nama, label, pesan }) {
            commit('setNotifikasi', {
                tampil,
                nama,
                label,
                pesan
            })
            setTimeout(() => {
                commit('resetNotifikasi')
            }, 3000)
        },
        memproses({ commit }) {
            commit('proses')
        },
        selesai({ commit }) {
            commit('resetNotifikasi')
        }
    }
}