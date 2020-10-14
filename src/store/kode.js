import { stringifyUrl } from 'query-string';
import { kirimData } from '../utils';
import { URL_API, OPSI_STRINGIFY } from '../constans';

export default {
    namespaced: true,
    state() {
        return {
            daftarKode: [],
            kosong: true
        }
    },
    mutations: {
        setDaftarKode(state, { daftarKode, kosong }) {
            state.daftarKode = daftarKode,
            state.kosong = kosong
        },
        resetDaftarKode(state) {
            state.daftarKode = [],
            state.kosong = true
        }
    },
    actions: {
        async dapatkanSemuaKode({ commit, dispatch }, { idPengguna, filter}) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const objectURL = {
                    url: `${ URL_API }/code/list`,
                    query: {
                        page: filter.halaman,
                        limit: filter.banyakData,
                        sortBy: filter.urutkanBerdasarkan,
                        sort: filter.urutkan,
                        highlighted: filter.apakahSorotanMenyala
                    }
                };
                const url = stringifyUrl(objectURL, OPSI_STRINGIFY);
                const respon = await kirimData(url, {
                    user: idPengguna
                });
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    commit('setDaftarKode', {
                        daftarKode: respon.data,
                        kosong: false
                    })
                } else {
                    dispatch('notifikasi/selesai', null, { root: true });
                    throw new Error(respon.message)
                }
            } catch(error) {
                commit('resetDaftarKode');
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Gagal memuat daftar kode'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        },
        async simpanKode({ dispatch }, { idPengguna, konten }) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const url = `${ URL_API }/code/store`;
                const data = {
                    user: idPengguna,
                    content: {
                        code: konten.kode,
                        lang: konten.bahasaTerpilih,
                        highlight: konten.barisTersorot,
                        fileName: konten.namaBerkas,
                        twoslash: konten.twoslashTerpilih
                    }
                };
                const respon = await kirimData(url, data);
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    const notif = {
                        tampil: true,
                        nama: 'process',
                        label: 'Berhasil!',
                        pesan: 'Kode berhasil disimpan'
                    };
                    await dispatch('notifikasi/tampilkan', notif, { root: true });
                } else {
                    dispatch('notifikasi/memproses', null, { root: true });
                    throw new Error(respon.message)
                }
            } catch(error) {
                dispatch('notifikasi/memproses', null, { root: true });
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Gagal menyimpan kode'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        },
        async ubahKode({ dispatch }, { idPengguna, idKode, konten}) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const url = `${ URL_API }/code/edit`;
                const data = {
                    id: idKode,
                    user: idPengguna,
                    content: {
                        code: konten.code,
                        lang: konten.bahasaPemrograman,
                        highlight: konten.highlight,
                        fileName: konten.namaBerkas,
                        twoslash: konten.twoslash
                    }
                };
                const respon = await kirimData(url, data);
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    const notif = {
                        tampil: true,
                        nama: 'process',
                        label: 'Berhasil!',
                        pesan: 'Kode berhasil diedit'
                    };
                    await dispatch('notifikasi/tampilkan', notif, { root: true });
                } else {
                    dispatch('notifikasi/memproses', null, { root: true });
                    throw new Error(respon.message)
                }
            } catch(error) {
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Gagal mengedit kode'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        },
        async hapusKode({ dispatch }, { idPengguna, idKode }) {
            try {
                dispatch('notifikasi/memproses', null, { root: true });
                const url = `${ URL_API }/code/delete`;
                const respon = await kirimData(url, {
                    id: idKode,
                    user: idPengguna
                });
                if (respon.success && !respon.error) {
                    dispatch('notifikasi/selesai', null, { root: true });
                    const notif = {
                        tampil: true,
                        nama: 'process',
                        label: 'Berhasil!',
                        pesan: 'Kode berhasil dihapus'
                    };
                    await dispatch('notifikasi/tampilkan', notif, { root: true });
                } else {
                    dispatch('notifikasi/memproses', null, { root: true });
                    throw new Error(respon.message)
                }
            } catch(error) {
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Gagal menghapus kode'
                };
                dispatch('notifikasi/tampilkan', notif, { root: true });
                console.log(error)
            }
        }
    }
}