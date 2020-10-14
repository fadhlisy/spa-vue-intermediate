<template>
    <div class="editor">
        <h2 class="title-editor">Buat kode baru</h2>
        <div class="editor-body">
            <editor-form
                :kode.sync="data.inputKode"
                :bahasa.sync="data.bahasaTerpilih"
                :twoslash.sync="data.twoslashTerpilih"
                :nama.sync="data.namaBerkas"
                :sorot.sync="data.barisTersorot"
                :hasil-highlight="hasilHighlight"
                :garing="duaGaring()"
                @reset="mereset"
                @unduh="mengunduh"
                @simpan="menyimpan"
            />
            <editor-preview
                :kode="hasilHighlight"
                :bahasa-pemrograman="data.bahasaTerpilih"
            />
        </div>
    </div>
</template>

<script>
import cleanDeep from 'clean-deep'
import debounce from 'debounce-fn'
import { stringifyUrl } from 'query-string'
import { URL_API, OPSI_STRINGIFY } from '../../constans'
import { kirimData, unduhKode } from '../../utils'
import EditorForm from './EditorForm'
import EditorPreview from './EditorPreview'

export default {
    components: {
        EditorForm,
        EditorPreview
    },
    data() {
        return {
            data: {
                inputKode: null,
                bahasaTerpilih: null,
                twoslashTerpilih: null,
                namaBerkas: null,
                barisTersorot: null
            },
            hasilHighlight: `<pre class="shiki"><div class="shiki__meta"><div class="shiki__language">javascript</div><div class="shiki__filename">example.js</div></div><div class="shiki__code"><code><div class="line"><span style="color: #7FDBCA">console</span><span style="color: #C792EA">.</span><span style="color: #82AAFF">log</span><span style="color: #D6DEEB">(</span><span style="color: #D9F5DD">'</span><span style="color: #ECC48D">Hello World!</span><span style="color: #D9F5DD">'</span><span style="color: #D6DEEB">)</span></div></code></div></pre>`
        }
    },
    watch: {
        data: {
            handler: debounce(function(data) {
                this.hasilHighlight = '';
                this.highlighter(data.inputKode)
            }, { wait: 500 }),
            deep: true
        }
    },
    methods: {
        duaGaring() {
            if (this.data.bahasaTerpilih === 'json' || this.data.bahasaTerpilih === 'typescript') {
                return false
            }
            this.data.twoslashTerpilih = null;
            return true
        },
        mereset() {
            this.data.inputKode = null;
            this.data.bahasaTerpilih = null;
            this.data.twoslashTerpilih = null;
            this.data.namaBerkas = null;
            this.data.barisTersorot = null;
            this.hasilHighlight = `<pre class="shiki"><div class="shiki__meta"><div class="shiki__language">javascript</div><div class="shiki__filename">example.js</div></div><div class="shiki__code"><code><div class="line"><span style="color: #7FDBCA">console</span><span style="color: #C792EA">.</span><span style="color: #82AAFF">log</span><span style="color: #D6DEEB">(</span><span style="color: #D9F5DD">'</span><span style="color: #ECC48D">Hello World!</span><span style="color: #D9F5DD">'</span><span style="color: #D6DEEB">)</span></div></code></div></pre>`
        },
        async menyimpan() {
            if (!this.data.bahasaTerpilih && !this.data.inputKode) {
                this.$store.dispatch('notifikasi/tampilkan', {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: 'Bahasa pemrograman dan kode wajib diisi!'
                })
            } else {
                try {
                    const konten = cleanDeep({
                        kode: this.data.inputKode,
                        bahasaTerpilih: this.data.bahasaTerpilih,
                        barisTersorot: this.data.barisTersorot,
                        namaBerkas: this.data.namaBerkas,
                        twoslashTerpilih: this.data.twoslashTerpilih
                    });
                    await this.$store.dispatch('kode/simpanKode', {
                        idPengguna: this.$store.state.pengguna.idPengguna,
                        konten: konten
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
                } catch(error) {
                    const notif = {
                        tampil: true,
                        nama: 'error',
                        label: 'Kesalahan!',
                        pesan: error.message || 'Gagal menyimpan kode'
                    };
                    this.$store.dispatch('notifikasi/tampilkan', notif)
                }
            }
        },
        async mengunduh() {
            if (!this.data.bahasaTerpilih && !this.data.inputKode) {
                this.$store.dispatch('notifikasi/tampilkan', {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: 'Bahasa pemrograman dan kode wajib diisi!'
                })
            } else {
                try {
                    this.$store.dispatch('notifikasi/memproses');
                    const objekURL = {
                        url: URL_API,
                        query: {
                            lang: this.data.bahasaTerpilih,
                            fileName: this.data.namaBerkas,
                            highlight: this.data.barisTersorot,
                            twoslash: this.data.twoslashTerpilih,
                            download: 1
                        }
                    };
                    const url = stringifyUrl(objekURL, OPSI_STRINGIFY);
                    await unduhKode(url, {
                        code: this.data.inputKode
                    });
                    this.$store.dispatch('notifikasi/selesai');
                } catch(error) {
                    this.$store.dispatch('notifikasi/selesai');
                    const notif = {
                        tampil: true,
                        nama: 'error',
                        label: 'Kesalahan!',
                        pesan: error.message || 'Gagal mengunduh kode'
                    };
                    this.$store.dispatch('notifikasi/tampilkan', notif)
                }
            }
        },
        async highlighter(inputKode, download) {
            try {
                this.$store.dispatch('notifikasi/memproses');
                const objekURL = {
                    url: URL_API,
                    query: {
                        lang: this.data.bahasaTerpilih,
                        fileName: this.data.namaBerkas,
                        highlight: this.data.barisTersorot,
                        twoslash: this.data.twoslashTerpilih,
                        download
                    }
                };
                const url = stringifyUrl(objekURL, OPSI_STRINGIFY);
                const respon = await kirimData(url, {
                    code: inputKode
                });
                if (respon.success && !respon.error) {
                    this.$store.dispatch('notifikasi/selesai');
                    this.hasilHighlight = respon.data
                } else {
                    this.$store.dispatch('notifikasi/selesai');
                    throw new Error(respon.message)
                }
            } catch(error) {
                this.$store.dispatch('notifikasi/selesai');
                const notif = {
                    tampil: true,
                    nama: 'error',
                    label: 'Kesalahan!',
                    pesan: error.message || 'Bahasa pemrograman dan kode harus diisi!'
                };
                this.$store.dispatch('notifikasi/tampilkan', notif);
            }
        }
    }
}
</script>