Converter from lilypond code to pdf: <br /><br />

<form method="post" action="lilypond_converter.php">

    Your name:<br>
    <input type="text" name="author">

    Song language:<br>
    <select name="language">
      <option value="en" selected>English</option>
      <option value="da">Danish</option>
    </select>

    Song title:<br>
    <input type="text" name="title">

    Song key:<br>
    <select name="key">
      <option value="C" selected>C-major</option>
      <option value="Cm">C-minor</option>
      <option value="D">D-major</option>
      <option value="Dm">D-minor</option>
      <option value="E">E-major</option>
      <option value="Em">E-minor</option>      
      <option value="F">F-major</option>
      <option value="Fm">F-minor</option>
      <option value="G">G-major</option>
      <option value="Gm">G-minor</option>
      <option value="A">A-major</option>
      <option value="Am">A-minor</option>
      <option value="B">B-major</option>
      <option value="Bm">B-minor</option>
    </select>

    <textarea name="lilypond_code" style="width: 800px; height: 400px;">c'8 c' c' d' e' e' e'4 |
  d'8 d' d' e' c'4 c' |
  e'4 e'8 f' g'4 g'8 g' |
  f'8 f' f' g' e'2 |
  c''4 c'' b' b'8 b' |
  a'8 a' a' a' g'2 |
  c'8 c' c' d' e' e' e'4 |
  d'8 d' d' e' c'2 </textarea>

    <br />

    <input type="submit" value="Convert" />

</form>
