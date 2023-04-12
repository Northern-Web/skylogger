<script setup>
  import { loadStytch } from '@stytch/stytch-js'
  import { onMounted } from 'vue';

  const setup = async () => {
    const Stytch = await loadStytch();

    let stytch = Stytch("public-token-test-f466f2ec-fea2-4030-af48-dd3f8fc79165").mount({
      elementId: '#gtap',
      loginOrSignupView: {
        products: ['oauth'],
        oauthOptions: {
          providers: [{
            type: 'google',
            'one_tap': true,
            position: 'embedded'
          }]
        }
      },
      style: {
        width: 'calc(100% - 20px)'
      }
    });
  }

  onMounted(() => {
    setup();
  });
</script>

<template>
  <main>
    <section class="container">
      <h1>SkyLogger</h1>
      
      <div>
        <div id="gtap">

        </div>
      </div>
    </section>
  </main>

</template>

