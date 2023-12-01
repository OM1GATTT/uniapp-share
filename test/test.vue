<template>
  <view>
	  
    <u-dropdown v-model="selectedOption" :options="dropdownOptions"></u-dropdown>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: 'PASS',
      dropdownOptions: [
        { value: 'PASS', label: 'PASS' },
        { value: 'REJECT', label: 'REJECT' }
      ]
    };
  }
};
</script>
