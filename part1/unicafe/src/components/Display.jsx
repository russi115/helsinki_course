function Display({ text, value, porcent=false }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {porcent?"%":""}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Display;
