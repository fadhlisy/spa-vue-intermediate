<template>
    <div class="collection" v-if="$store.state.pengguna.dashboard">
        <Penyaring
            :diurut-berdasar.sync="filter.urutkanBerdasarkan"
            :diurut-dari.sync="filter.urutkan"
            @berganti="dapatkanDaftarKode"
        />
        <daftar-koleksi
            :apakah-sorotan-menyala="filter.apakahSorotanMenyala"
            @terhapus="dapatkanDaftarKode"
        />
        <Paginasi
            :halaman="filter.halaman"
            :menuju.sync="filter.halaman"
            @beralih="dapatkanDaftarKode"
        />
    </div>
</template>

<script>
import DaftarKoleksi from './DaftarKoleksi'
import Penyaring from './Penyaring'
import Paginasi from './Paginasi'

export default {
    components: {
        DaftarKoleksi,
        Penyaring,
        Paginasi
    },
    data() {
        return {
            filter: {
                halaman: 1,
                banyakData: 6,
                urutkanBerdasarkan: 'createdAt',
                urutkan: 'DESC',
                apakahSorotanMenyala: 1
            }
        }
    },
    methods: {
        async dapatkanDaftarKode() {
            await this.$store.dispatch('kode/dapatkanSemuaKode', {
                idPengguna: this.$store.state.pengguna.idPengguna,
                filter: this.filter
            })
        }
    }
}
</script>