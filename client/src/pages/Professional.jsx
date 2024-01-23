export default function Professional({ messages }) {
    const professionalMessages = messages.filter(message => message.category === 1);

    return (
      <div>
        <h2>Professional</h2>

        <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Message</th>
            
          </tr>
        </thead>
        <tbody>
            {professionalMessages.map((item, index) => ( // Use professionalMessages here
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.message}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    );
  }