<?php
session_start();
if(!isset($_SESSION["username"])){
header("Location: login.php");
exit(); }
?>
<html>
<!DOCTYPE html>
<html lang="en-us">

  {% include head.html %}

  <body>

    {% include sidebar.html %}

    <div class="content container">
      {{ content }}
    </div>

  </body>
</html>
