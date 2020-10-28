using System.Collections.Generic;
using System.Threading.Tasks;

using Domain.DTO;
using Domain.Entities;

namespace Repository.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessageGroup(Group group);
        Task<Group> GetMessageGroup(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnection(string connectionId);
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string recipientUsername);
        Task<bool> SaveAllAsync();
    }
}
