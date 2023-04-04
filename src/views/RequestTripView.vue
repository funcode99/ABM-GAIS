<script setup>

</script>

<template>
    <section>
        <FormKit type="form">
  <FormKit type="multi-step">
    <FormKit type="step" name="contactInformation">
      <!-- collect name, email, and company info -->
      <FormKit 
        type="text" 
        label="Your Name" 
        validation="required"
      />
      <FormKit 
        type="email" 
        label="Your Email" 
        validation="required|email" 
      />
      <FormKit 
        type="text" 
        label="Your Company (optional)"
        help="Are speaking on behalf of an organization?"
      />
    </FormKit>

    <FormKit type="step" name="talkDetails">
      <!-- Get talk title, brief, and track -->
      <FormKit 
        type="text" 
        label="Talk Title" 
        validation="required"
      />
      <FormKit 
        type="textarea" 
        label="Talk Brief" 
        validation="required|length:100"
        help="What is your talk about?"
      />
      <FormKit 
        type="radio" 
        label="Talk Track"
        help="Which track are you submitting for?"
        :options="['Development', 'Testing', 'Leadership']"
      />
    </FormKit>

    <FormKit type="step" name="referral">
      <!-- Ask the user to share how they heard about us -->
      <h2>Thank you for taking the time to submit your talk</h2>
      <p>If you don't mind we'd love to know how you heard about VueUniverse.</p>
      <FormKit 
        type="radio" 
        label="How did you hear about VueUniverse?" 
        :options="['Online Ad', 'Friend or Coworker', 'Search Results', 'Other']"
      />
    </FormKit>
  </FormKit>
</FormKit>
    </section>
</template>