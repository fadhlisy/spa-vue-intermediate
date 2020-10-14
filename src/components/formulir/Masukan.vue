<template>
    <input type="text" :class="`input-${ nama }`" :placeholder="placeholder" :value="nilai" @input="diubah">
</template>

<script>
export default {
    props: {
        nama: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        value: {
            type: [String, Number],
            default: ''
        },
        reset: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        nilai() {
            if (this.reset) {
                return ''
            }
            return this.value
        }
    },
    methods: {
        diubah(e) {
            this.$emit('berubah', e.target.value)
        }
    }
}
</script>