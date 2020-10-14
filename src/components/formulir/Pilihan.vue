<template>
    <div class="form-col">
        <label class="form-label">{{ label }}</label>
        <div class="form-dropdown">
            <select class="select-editor" @change="ganti" :disabled="nonaktif">
                <option value="" :selected="reset">Pilih ...</option>
                <option v-for="(pilihan, i) in daftar" :key="i" :value="pilihan">{{ pilihan }}</option>
            </select>
            <div class="form-dropdown-icon">
                <Ikon nama="dropdown-form" box="0 0 20 20" path="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </div>
        </div>
    </div>
</template>

<script>
import Ikon from '../Ikon';

export default {
    components: {
        Ikon
    },
    props: {
        label: {
            type: String,
            required: true
        },
        daftar: {
            type: Array,
            required: true,
            default() {
                return []
            }
        },
        nonaktif: {
            type: Boolean,
            required: false
        },
        reset: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ganti(e) {
            this.$emit('berganti', e.target.value)
        }
    }
}
</script>