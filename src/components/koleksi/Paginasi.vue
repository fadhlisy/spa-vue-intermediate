<template>
    <div class="pagination">
        <Tombol nama="pagination" label="Sebelumnya" @klik="kembali" v-if="terlihat">
            <template v-slot:kanan>
                <Ikon nama="pagination" box="-49 141 512 512" path="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"/>
            </template>
        </Tombol>
        <Tombol nama="pagination" label="Selanjutnya" @klik="lanjut" v-if="!$store.state.kode.kosong">
            <template v-slot:kiri>
                <Ikon nama="pagination" box="-49 141 512 512" path="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
            </template>
        </Tombol>
    </div>
</template>

<script>
import Tombol from '../formulir/Tombol'
import Ikon from '../Ikon'

export default {
    components: {
        Tombol,
        Ikon
    },
    props: {
        halaman: {
            type: Number,
            required: true,
            default: 1
        }
    },
    computed: {
        terlihat() {
            if (this.halaman === 1 && this.$store.state.kode.daftarKode) {
                return false
            }
            return true
        }
    },
    methods: {
        kembali() {
            this.$emit('update:menuju', this.halaman - 1);
            this.$emit('beralih')
        },
        lanjut() {
            this.$emit('update:menuju', this.halaman + 1);
            this.$emit('beralih')
        }
    }
}
</script>