<template>
    <div class="collection-title">
        <h2 class="title-collection">Koleksi kode kamu</h2>
        <div>
            <div class="collection-filter">
                <Ikon nama="dropdown-filter" box="0 0 412 232" path="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"/>
                <select class="select-collection" v-model="diurutkanBerdasar" @change="gantiPengurut">
                    <option v-for="(pengurut, i) in pengurutan" :key="i" :value="pengurut.nilai">{{ pengurut.teks }}</option>
                </select>
            </div>
            <div class="collection-filter">
                <Ikon nama="dropdown-filter" box="0 0 412 232" path="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"/>
                <select class="select-collection" v-model="diurutkanDari" @change="gantiUrutan">
                    <option v-for="(pengurut, i) in urutan" :key="i" :value="pengurut.nilai">{{ pengurut.teks }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import Ikon from '../Ikon'

export default {
    components: {
        Ikon
    },
    data() {
        return {
            pengurutan: [
                { nilai: 'createdAt', teks: 'Kapan dibuat'},
                { nilai: 'fileName', teks: 'Nama berkas'},
                { nilai: 'lang', teks: 'Bahasa pemrograman'}
            ],
            diurutkanBerdasar: 'createdAt',
            diurutkanDari: 'DESC'
        }
    },
    computed: {
        urutan() {
            if  (this.diurutkanBerdasar !== 'createdAt') {
                return [
                    { nilai: 'ASC', teks: 'A-Z'},
                    { nilai: 'DESC', teks: 'Z-A'}
                ]
            }
            return [
                { nilai: 'ASC', teks: 'Terlama'},
                { nilai: 'DESC', teks: 'Terbaru'}
            ]
        }
    },
    methods: {
        gantiPengurut(e) {
            this.$emit('update:diurutBerdasar', e.target.value);
            this.$emit('berganti')
        },
        gantiUrutan(e) {
            this.$emit('update:diurutDari', e.target.value);
            this.$emit('berganti')
        }
    }
}
</script>