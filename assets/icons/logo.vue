<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "800px",
  },
  height: {
    type: String,
    default: "800px",
  },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="flat">
      <rect height="12" style="fill: #b0342e" width="24" x="20" y="3" />

      <path
        d="M49,3H40A8,8,0,0,1,24,3H15A12,12,0,0,0,3,15V53h8l.957-32.523A1.521,1.521,0,0,1,13.478,19h0A1.521,1.521,0,0,1,15,20.522V50a3,3,0,0,0,3,3H46a2.993,2.993,0,0,0,3-2.992V20.52A1.52,1.52,0,0,1,50.522,19h0a1.521,1.521,0,0,1,1.521,1.477L53,53h8V15A12,12,0,0,0,49,3Z"
        style="fill: #dd4a43"
      />

      <path
        d="M40,3A8,8,0,0,1,24,3H20A12,12,0,0,0,44,3Z"
        style="fill: #7ea82d"
      />

      <path
        d="M56,25a1,1,0,0,1-.707-.293L52,21.414A1,1,0,0,1,52,20h0a1,1,0,0,1,1.414,0L56,22.586,59.586,19A1,1,0,0,1,61,19h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,56,25Z"
        style="fill: #7ea82d"
      />

      <path
        d="M44,25a1,1,0,0,1-.707-.293L38,19.414l-5.293,5.293a1,1,0,0,1-1.414,0L26,19.414l-5.293,5.293a1,1,0,0,1-1.348.061l-5.231-4.36A1,1,0,0,1,14,19h0a1,1,0,0,1,1.408-.127l4.53,3.775,5.355-5.354a1,1,0,0,1,1.414,0L32,22.586l5.293-5.293a1,1,0,0,1,1.414,0l5.355,5.354,4.53-3.775A1,1,0,0,1,50,19h0a1,1,0,0,1-.128,1.408l-5.231,4.36A1,1,0,0,1,44,25Z"
        style="fill: #7ea82d"
      />

      <path
        d="M8,25a1,1,0,0,1-.707-.293L3,20.414A1,1,0,0,1,3,19H3a1,1,0,0,1,1.414,0L8,22.586,10.586,20A1,1,0,0,1,12,20h0a1,1,0,0,1,0,1.414L8.707,24.707A1,1,0,0,1,8,25Z"
        style="fill: #7ea82d"
      />

      <path
        d="M56,41a1,1,0,0,1-.707-.293L52.583,38a1,1,0,0,1,0-1.415h0a1,1,0,0,1,1.414,0l2,2L59.586,35A1,1,0,0,1,61,35h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,56,41Z"
        style="fill: #7ea82d"
      />

      <path
        d="M44,41a1,1,0,0,1-.707-.293L38,35.414l-5.293,5.293a1,1,0,0,1-1.414,0L26,35.414l-5.293,5.293a1,1,0,0,1-1.414,0L15,36.414A1,1,0,0,1,15,35h0a1,1,0,0,1,1.414,0L20,38.586l5.293-5.293a1,1,0,0,1,1.414,0L32,38.586l5.293-5.293a1,1,0,0,1,1.414,0L44,38.586,47.586,35A1,1,0,0,1,49,35h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,44,41Z"
        style="fill: #7ea82d"
      />

      <path
        d="M8,41a1,1,0,0,1-.707-.293L3,36.414A1,1,0,0,1,3,35H3a1,1,0,0,1,1.414,0l3.6,3.594,2.077-2.028a1,1,0,0,1,1.414.018h0A1,1,0,0,1,11.483,38L8.7,40.716A1,1,0,0,1,8,41Z"
        style="fill: #7ea82d"
      />

      <path
        d="M56,33a1,1,0,0,1-.707-.293L52,29.414A1,1,0,0,1,52,28h0a1,1,0,0,1,1.414,0L56,30.586,59.586,27A1,1,0,0,1,61,27h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,56,33Z"
        style="fill: #d13e37"
      />

      <path
        d="M44,33a1,1,0,0,1-.707-.293L38,27.414l-5.293,5.293a1,1,0,0,1-1.414,0L26,27.414l-5.293,5.293a1,1,0,0,1-1.414,0L15,28.414A1,1,0,0,1,15,27h0a1,1,0,0,1,1.414,0L20,30.586l5.293-5.293a1,1,0,0,1,1.414,0L32,30.586l5.293-5.293a1,1,0,0,1,1.414,0L44,30.586,47.586,27A1,1,0,0,1,49,27h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,44,33Z"
        style="fill: #d13e37"
      />

      <path
        d="M8,33a1,1,0,0,1-.707-.293L3,28.414A1,1,0,0,1,3,27H3a1,1,0,0,1,1.414,0L8,30.586,10.586,28A1,1,0,0,1,12,28h0a1,1,0,0,1,0,1.414L8.707,32.707A1,1,0,0,1,8,33Z"
        style="fill: #d13e37"
      />

      <path
        d="M56,49a1,1,0,0,1-.707-.293L53,46.414A1,1,0,0,1,53,45h0a1,1,0,0,1,1.414,0L56,46.586,59.586,43A1,1,0,0,1,61,43l.707.707-5,5A1,1,0,0,1,56,49Z"
        style="fill: #d13e37"
      />

      <path
        d="M44,49a1,1,0,0,1-.707-.293L38,43.414l-5.293,5.293a1,1,0,0,1-1.414,0L26,43.414l-5.293,5.293a1,1,0,0,1-1.414,0L15,44.414A1,1,0,0,1,15,43h0a1,1,0,0,1,1.414,0L20,46.586l5.293-5.293a1,1,0,0,1,1.414,0L32,46.586l5.293-5.293a1,1,0,0,1,1.414,0L44,46.586,47.586,43A1,1,0,0,1,49,43h0a1,1,0,0,1,0,1.414l-4.293,4.293A1,1,0,0,1,44,49Z"
        style="fill: #d13e37"
      />

      <path
        d="M8,49a1,1,0,0,1-.707-.293L3,44.414A1,1,0,0,1,3,43H3a1,1,0,0,1,1.414,0L8,46.586,9.586,45A1,1,0,0,1,11,45h0a1,1,0,0,1,0,1.414L8.707,48.707A1,1,0,0,1,8,49Z"
        style="fill: #d13e37"
      />

      <polygon points="18 61 17 53 47 53 46 61 18 61" style="fill: #d13e37" />

      <polygon points="11 53 3 53 4 61 11 61 11 53" style="fill: #d13e37" />

      <polygon points="53 53 61 53 60 61 53 61 53 53" style="fill: #d13e37" />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="29"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="25"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="21"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="41"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="37"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="33"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="6"
        y="53"
      />

      <rect
        height="8"
        rx="1"
        ry="1"
        style="fill: #b0342e"
        width="2"
        x="56"
        y="53"
      />

      <path
        d="M12.334,9.284,11.666,7.4A6.993,6.993,0,0,1,14,7V9A4.989,4.989,0,0,0,12.334,9.284Z"
        style="fill: #e66b65"
      />

      <path
        d="M9,15H7V14A7.012,7.012,0,0,1,9.333,8.783l1.334,1.49A5.006,5.006,0,0,0,9,14Z"
        style="fill: #e66b65"
      />

      <rect height="2" style="fill: #dd4a43" width="6" x="29" y="6" />
    </g>
  </svg>
</template>
