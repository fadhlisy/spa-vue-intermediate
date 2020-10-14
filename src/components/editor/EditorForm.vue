<template>
    <div class="editor-setting">
        <form class="form-setting">
            <div class="form-row">
                <Pilihan label="Bahasa pemrograman"
                    :daftar="daftarBahasaPemrograman"
                    :reset="aturUlang"
                    @berganti="gantiBahasa($event)"
                />
                <div class="form-col">
                    <label class="form-label">Nama berkas</label>
                    <Masukan
                        nama="form"
                        :reset="aturUlang"
                        @berubah="$emit('update:nama', $event)"
                    />
                </div>
            </div>
            <div class="form-row">
                <Pilihan label="Twoslash"
                    :daftar="twoslash"
                    :nonaktif="garing"
                    :reset="aturUlang"
                    @berganti="gantiTwoslash($event)"
                />
                <div class="form-col">
                    <label class="form-label">Baris yang disorot</label>
                    <Masukan
                        nama="form"
                        :reset="aturUlang"
                        @berubah="$emit('update:sorot', $event)"
                    />
                </div>
            </div>
            <!--<kotak-teks
                label="Kode"
                :reset="aturUlang"
                @berubah="$emit('update:kode', $event)"
            />-->
            <div class="form-block">
                <label class="form-label">Kode</label>
                <textarea class="text-form" @input="berubah" v-model='kode'></textarea>
            </div>
            <div class="form-option">
                <Tombol
                    nama="option"
                    label="Reset"
                    @klik="mengatur"
                />
                <Tombol
                    nama="option"
                    label="Unduh"
                    v-if="kode && hasilHighlight && hasilHighlight.length > 0"
                    @klik="$emit('unduh')"
                />
                <Tombol
                    nama="option"
                    label="Simpan"
                    v-if="$store.state.pengguna.idPengguna"
                    @klik="$emit('simpan')"
                />
            </div>
        </form>
    </div>
</template>

<script>
// import KotakTeks from '../formulir/KotakTeks'
import Masukan from '../formulir/Masukan'
import Pilihan from '../formulir/Pilihan'
import Tombol from '../formulir/Tombol'
import { dapatkanOpsi, validator } from '../../utils'

export default {
    components: {
        // KotakTeks,
        Masukan,
        Pilihan,
        Tombol
    },
    props: {
        garing: {
            type: Boolean,
            default: true
        },
        hasilHighlight: {
            required: true,
            validator
        }
    },
    data() {
        return {
            kode: '',
            daftarBahasaPemrograman: [],
            twoslash: ['twoslash', 'tsconfig'],
            aturUlang: false
        }
    },
    async created() {
        await this.dapatkanDaftarBahasaPemrograman()
    },
    methods: {
        berubah() {
            this.$emit('update:kode', this.kode)
        },
        gantiBahasa(pilihan) {
            this.aturUlang = false;
            this.$emit('update:bahasa', pilihan)
        },
        gantiTwoslash(pilihan) {
            this.aturUlang = false;
            this.$emit('update:twoslash', pilihan)
        },
        mengatur() {
            this.kode = '';
            this.aturUlang = true;
            this.$emit('reset')
        },
        async dapatkanDaftarBahasaPemrograman() {
            try {
                const respon = await dapatkanOpsi();
                if (respon.success && !respon.error) {
                    this.daftarBahasaPemrograman = respon.data.languages
                }
            } catch(error) {
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: 'Gagal mendapatkan daftar bahasa pemrograman'
                };
                this.$store.dispatch('notifikasi/tampilkan', notif);
                console.log(error)
            }
        }
    }
}
</script>