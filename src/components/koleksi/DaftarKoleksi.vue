<template>
    <div class="collection-list">
        <Kode 
            nama="collection"
            v-for="(item, i) in $store.state.kode.daftarKode"
            :key="i"
        >
            <Tombol
                nama="delete"
                label="hapus"
                @klik="menghapus(item.id)"
            />
            <div class="code-list">
                <data-code
                    :code="item.code"
                    :lang="item.lang"
                    :is-highlighted="apakahSorotanMenyala"
                />
            </div>
        </Kode>
    </div>
</template>

<script>
import Kode from '../Kode'
import Tombol from '../formulir/Tombol'

export default {
    components: {
        Kode,
        Tombol
    },
    props: {
        apakahSorotanMenyala: {
            type: Number,
            default: 1,
            required: true
        }
    },
    methods: {
        async menghapus(id) {
            const konfir = confirm('Apakah kamu yakin?');
            if (konfir && id) {
                await this.$store.dispatch('kode/hapusKode', {
                    idPengguna: this.$store.state.pengguna.idPengguna,
                    idKode: id
                })
                await this.$emit('terhapus')
            }
        }
    }
}
</script>