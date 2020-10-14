import { URL_API } from '../constans';
import { kirimData } from '../utils';

export default {
    namespaced: true,
    state() {
        return {
            login: true,
            dashboard: false,
            idPengguna: null,
            namaPengguna: null,
        }
    },
    mutations: {
        setDataPengguna(state, { idPengguna, namaPengguna }) {
            state.login = false;
            state.dashboard = true;
            state.idPengguna = idPengguna;
            state.namaPengguna = namaPengguna;
        },
        resetDataPengguna(state) {
            state.login = true;
            state.dashboard = false;
            state.idPengguna = null;
            state.namaPengguna = null;
        }
    },
    actions: {
        async masuk({ commit, dispatch }, { namaPengguna }) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const url = `${ URL_API }/user/login`;
                const respon = await kirimData(url, {
                    name: namaPengguna
                });
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    commit('setDataPengguna', {
                        idPengguna: respon.data.id,
                        namaPengguna: respon.data.name
                    });
                    const notif = {
                        tampil: true,
                        nama: 'success',
                        label: 'Berhasil!',
                        pesan: 'Login berhasil'
                    };
                    await dispatch('notifikasi/tampilkan', notif, { root: true });
                } else {
                    dispatch('notifikasi/selesai', null, { root: true });
                    throw new Error(respon.message);
                }
            } catch(error) {
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Login tidak berhasil'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        },
        async daftar({ commit, dispatch }, { namaPengguna }) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const url = `${ URL_API }/user/register`;
                const respon = await kirimData(url, {
                    name: namaPengguna
                });
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    commit('setDataPengguna', {
                        idPengguna: respon.data.id,
                        namaPengguna: respon.data.name
                    });
                    const notif = {
                        tampil: true,
                        nama: 'success',
                        label: 'Berhasil!',
                        pesan: 'Pendaftaran berhasil'
                    };
                    await dispatch('notifikasi/tampilkan', notif, { root: true });
                } else {
                    dispatch('notifikasi/selesai', null, { root: true });
                    throw new Error(respon.message);
                }
            } catch(error) {
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Pendaftaran tidak berhasil'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        },
        keluar({ commit, dispatch }) {
            commit('resetDataPengguna')
            // commit('kode/resetKode', null, { root: true });
            const notif = {
                tampil: true,
                nama: 'success',
                label: 'Berhasil!',
                pesan: 'Logout berhasil'
            };
            dispatch('notifikasi/tampilkan', notif, { root: true });
        }
    }
}