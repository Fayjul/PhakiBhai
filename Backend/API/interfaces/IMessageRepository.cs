using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserId, int recipientUserId);
        Task<bool> SaveAllAsync();

    }
}