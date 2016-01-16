Converter from lilypond code to pdf: <br /><br />

<form method="post" action="lilypond_converter.php">

    Your name:<br />
    <input type="text" name="author">

    <br /><br />

    Song language:<br />
    <select name="language">
      <option value="en" selected>English</option>
      <option value="da">Danish</option>
    </select>

    <br /><br />

    Song title:<br />
    <input type="text" name="title"><br />

    <br /><br />

    Song key:<br />
    <select name="key">
      <option value="\key c \major" selected>C-major</option>
      <option value="\key c \minor">C-minor</option>
      <option value="\key d \major">D-major</option>
      <option value="\key d \minor">D-minor</option>
      <option value="\key e \major">E-major</option>
      <option value="\key e \minor">E-minor</option>
      <option value="\key f \major">F-major</option>
      <option value="\key f \minor">F-minor</option>
      <option value="\key g \major">G-major</option>
      <option value="\key g \minor">G-minor</option>
      <option value="\key a \major">A-major</option>
      <option value="\key a \minor">A-minor</option>
      <option value="\key b \major">B-major</option>
      <option value="\key b \minor">B-minor</option>
    </select>

    <br /><br />

    <textarea name="lilypond_code" style="width: 800px; height: 400px;">c'8 c' c' d' e' e' e'4 |
d'8 d' d' e' c'4 c' |
e'4 e'8 f' g'4 g'8 g' |
f'8 f' f' g' e'2 |
c''4 c'' b' b'8 b' |
a'8 a' a' a' g'2 |
c'8 c' c' d' e' e' e'4 |
d'8 d' d' e' c'2 </textarea>

    <br /><br />

    <input type="submit" value="Convert" />

</form>
