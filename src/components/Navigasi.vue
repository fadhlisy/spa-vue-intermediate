<template>
    <div class="nav-menu top-navbar" id="navigation">
        <div class="nav-list">
            <keep-alive>
                <Pengguna
                    nama="login"
                    v-if="!$store.state.pengguna.dashboard && $store.state.pengguna.login"
                >
                    <Masukan
                        nama="login"
                        placeholder="Nama pengguna" 
                        :value="namaPenggunaMasuk"
                        @berubah="ubahNamaMasuk($event)"
                    />
                    <Tombol
                        nama="login"
                        label="Masuk"
                        @klik="memasukan"
                    />
                    <Tombol
                        nama="signup"
                        label="Mendaftar"
                        @klik="gantiMenu"
                    />
                </Pengguna>
                <Pengguna
                    nama="signup"
                    v-if="!$store.state.pengguna.dashboard && !$store.state.pengguna.login"
                >
                    <Tombol
                        nama="login"
                        label="Masuk"
                        @klik="gantiMenu"
                    />
                    <Masukan
                        nama="signup"
                        placeholder="Nama pengguna"
                        :value="namaPenggunaDaftar"
                        @berubah="ubahNamaDaftar($event)"
                    />
                    <Tombol
                        nama="signup"
                        label="Mendaftar"
                        @klik="mendaftarkan"
                    />
                </Pengguna>
            </keep-alive>
            <Pengguna
                nama="dashboard"
                v-if="$store.state.pengguna.dashboard"
            >
                <span class="user-greet">Selamat datang, {{ $store.state.pengguna.namaPengguna }}</span>
                <Tombol
                    nama="logout"
                    label="Keluar"
                    @klik="mengeluarkan"
                />
            </Pengguna>
        </div>
    </div>
</template>

<script>
import Pengguna from './Pengguna'
import Masukan from './formulir/Masukan'
import Tombol from './formulir/Tombol'

export default {
    components: {
        Pengguna,
        Masukan,
        Tombol
    },
    data() {
        return {
            namaPenggunaMasuk: '',
            namaPenggunaDaftar: ''
        }
    },
    methods: {
        gantiMenu() {
            this.$store.state.pengguna.login = !this.$store.state.pengguna.login
        },
        ubahNamaMasuk(nama) {
            this.namaPenggunaMasuk = nama
        },
        ubahNamaDaftar(nama) {
            this.namaPenggunaDaftar = nama
        },
        async memasukan() {
            await this.$store.dispatch('pengguna/masuk', {
                namaPengguna: this.namaPenggunaMasuk
            });
            await this.$store.dispatch('kode/dapatkanSemuaKode', {
                idPengguna: this.$store.state.pengguna.idPengguna,
                filter: {
                    halaman: 1,
                    banyakData: 6,
                    urutkanBerdasarkan: 'createdAt',
                    urutkan: 'DESC',
                    apakahSorotanMenyala: 1
                }
            })
        },
        mendaftarkan() {
            this.$store.dispatch('pengguna/daftar', {
                namaPengguna: this.namaPenggunaDaftar
            })
        },
        mengeluarkan() {
            this.$store.dispatch('pengguna/keluar');
        }
    }
}
</script>